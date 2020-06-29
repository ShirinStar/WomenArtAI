const { getEmails, getKeys } = require('./db')
const _ = require('lodash');

async function filterExistingPeople(personData) {
  const existingEmails = await getEmails()
  const emails = existingEmails.map(emailObj => emailObj.email);
  return personData.filter(person => !_.includes(emails, person.email));
}

async function filterEventKey(eventData) {
  const existEventKeys = await getKeys();
  const keys =  existEventKeys.map(eventResult => eventResult.key);
  const existingEmails = await getEmails()
  const memberEvents = eventData.filter(event => _.includes(_.map(existingEmails, "email"), event.email))
  return memberEvents.filter(event => !_.includes(keys, event.Timestamp))
}


module.exports = {
  filterExistingPeople,
  filterEventKey
}