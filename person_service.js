const { getEmails } = require('./db')
const _ = require('lodash');

async function filterExistingPeople(personData) {
  const existingEmails = await getEmails()
  const emails = existingEmails.map(emailObj => emailObj.email);
  return personData.filter(person => !_.includes(emails, person.email));
}
module.exports = {
  filterExistingPeople
}