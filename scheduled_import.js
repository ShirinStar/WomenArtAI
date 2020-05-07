const CronJob = require('cron').CronJob;
const { filterExistingPeople } = require('./person_service');
const { fetchSpreadSheetData } = require('./google_service');
const { getFile, extractID } = require('./google_service');
const { save } = require ('./db');
require('dotenv').config();

function parsePersonData(person) {
  const name = person['Full name'];
  const email = person.email;
  const headshot = person['Headshot image'];
  const bio = person['Short Bio'];
  const portfolio = person.Portfolio;
  const site = person.Website;
  const linkedin = person.Linkedin;
  return { name, email, headshot, bio, portfolio, site, linkedin }
}

const scheduledImport = async function() {
  const personData = await fetchSpreadSheetData();
  const newPeople = await filterExistingPeople(personData)
  const filteredData = newPeople.filter(person => person['Overall Status'] === 'Complete');

  console.log(filteredData);
  const mappedData =  filteredData.map(person => {
    return parsePersonData(person)
  })
  .map(async (person) => {
    try {
    const url = person.headshot; 
    const portfolioUrl = person.portfolio;
    const headshotId = extractID(url);
    const portfolioId = extractID(portfolioUrl);
    const file = await getFile(headshotId);
    const fileSec = await getFile(portfolioId);
    const thumbnailLink = file.data.thumbnailLink;
    const thumbnailLinkSec = fileSec.data.thumbnailLink;
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
  console.log(data)

  const personPromises = data.filter(val =>  !!val)
  .map(async (savePersonData) => {
    await save(savePersonData);
  })

  await Promise.all(personPromises)
  return data;
}

//cron timer
function startJob() {
  console.log('starting');
  const job = new CronJob('0 */1 * * * *', function() {
    scheduledImport();
  });
  console.log('timer did its job');
  job.start();
}

module.exports = {
  scheduledImport,
  startJob
}