const CronJob = require('cron').CronJob;
const { filterExistingPeople, filterEventKey } = require('./person_service');
const { getFile, extractID, fetchMemberSheetData, fetchEventSheetData  } = require('./google_service');
const { savePeople, saveEvent } = require ('./db');
require('dotenv').config();

function parsePersonData(person) {
  const name = person['Full name'];
  const email = person.email;
  const headshot = person['Headshot image'];
  const bio = person['Short Bio'];
  const portfolio = person['Image of work'];
  const site = person.Website;
  const linkedin = person.Linkedin;
  const instagram = person.Instagram;
  return { name, email, headshot, bio, portfolio, site, linkedin, instagram }
}

function parseEventData(event) {
  const key = event['Timestamp'];
  const name = event.Name;
  const email = event['Email Address'];
  const title = event['Title of event'];
  const date = event['Date of event'];
  const totalTime = event['Total time of event']
  const description = event['Short event description'];
  const link = event['Event link'];
  return { key, name, email, title, date, totalTime, description, link }
}

const scheduledImport = async function() {
  const personData = await fetchMemberSheetData();
  const eventData = await fetchEventSheetData();
  const newPeople = await filterExistingPeople(personData)
  const filteredData = newPeople.filter(person => person['Overall Status'] === 'Complete');
  const mappedData =  filteredData.map(person => {
    return parsePersonData(person)
  })
  .map(async (person) => {
    try {
    const url = person.headshot; 
    const portfolioUrl = person.portfolio;
    const headshotId = extractID(url);
    const portfolioId = extractID(portfolioUrl);
    const headshotImage = await getFile(headshotId);
    const portfolioImage = await getFile(portfolioId);
    const thumbnailLink = headshotImage;
    const thumbnailLinkSec = portfolioImage;
    return {
      ...person, headshot: thumbnailLink, 
     portfolio:thumbnailLinkSec
    } 
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined)
  }
  })
  //save to db
  const data = await Promise.all(mappedData)
  const personPromises = data.filter(val =>  !!val)
  .map(async (savePersonData) => {
    await savePeople(savePersonData);
  })

  await Promise.all(personPromises)
  const parsedEvents = eventData
  
    .filter(event => event['Overall Status'] === 'Complete')
    .map(parseEventData)
    console.log("from scheduled", parseEventData)
  const mappedEventData = await filterEventKey(parsedEvents)
  
 const eventPromises = mappedEventData.map(async (saveEventData) => {
    await saveEvent(saveEventData);
  })
  await Promise.all(eventPromises);

  return data;
}

//cron timer
function startJob() {
  const job = new CronJob('0 0 * * * *', function() {
    scheduledImport();
  });
  job.start();
  // scheduledImport();
}

function main() {
  scheduledImport();
}

main()
module.exports = {
  scheduledImport,
  startJob
}
