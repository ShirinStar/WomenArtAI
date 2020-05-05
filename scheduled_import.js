const { filterExistingPeople } = require('./person_service');
const { fetchSpreadSheetData } = require('./google_service');
const {getFile, getThumbnail, extractID} = require('./google_service');
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
  const personImage = await getThumbnail();
  const newPeople = await filterExistingPeople(personData)
  const filteredData = newPeople.filter(person => person['Overall Status'] === 'Complete');
  const mappedData =  filteredData.map(person => {
    return parsePersonData(person)
  })
  .map(async (person) => {
    try{
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
  }
  })
  
  const data = await Promise.all(mappedData)
  console.log(data)
}



module.exports = {
  scheduledImport
}