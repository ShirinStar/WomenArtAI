const { getEmails } = require('./db')
const _ = require('lodash');

async function filterExistingPeople(personData) {
  const existingEmails = await getEmails();
  return personData.filter(person => !_.includes(existingEmails, person.email));
}

module.exports = {
  filterExistingPeople
}