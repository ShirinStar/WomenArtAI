const { google } = require('googleapis');
const key = process.env.API_KEY;
SHEET_URL = 'https://sheets.googleapis.com/';
require('dotenv').config();
const fs = require('fs')

async function fetchMemberSheetData() {
  try {

  
  const sheets = google.sheets({
    version: 'v4',
    auth: process.env.API_KEY
  });

  const membersParams = {
    spreadsheetId: process.env.ANSWER_SHEET_MEMBER_ID,
    range: '!B:O'
  };

  const memberSheetData = await sheets.spreadsheets.values.get(membersParams)
  const records = memberSheetData.data.values.slice(1).map(row => {
    return row.reduce((person, cell, idx) => {
      const key = memberSheetData.data.values[0][idx];
      person[key] = cell;
      return person;
    }, {});
  })
  return records;
} catch (e) {
  console.log(e);
}
}


async function fetchEventSheetData() {
  try {

  
  const sheets = google.sheets({
    version: 'v4',
    auth: process.env.API_KEY
  });

  const eventsParams = {
    spreadsheetId: process.env.ANSWER_SHEET_EVENT_ID,
    range: '!A:J'
  };

  const eventSheetData = await sheets.spreadsheets.values.get(eventsParams)
  const eventRecords = eventSheetData.data.values.slice(1).map(row => {
    return row.reduce((event, cell, idx) => {
      const key = eventSheetData.data.values[0][idx];
      event[key] = cell;
      return event;
    }, {});
  })
  return eventRecords;
} catch(e) { console.log(e)}
}

const getFile = async (id) => {
  try {

  
  const key = process.env.API_KEY;

  const drive = google.drive({
    auth: process.env.API_KEY,
    version: 'v3'
  });

  const file = await drive.files.get({
    fileId: id,
    alt: 'media'
  }, { responseType: "arraybuffer" })
  const buf = Buffer.from(file.data).toString('base64');
  return buf
} catch(e) { 
  console.log('got a problem');
  console.log(e); }
};

function extractID(urlString) {
  const url = new URL(urlString)
  const id = url.searchParams.get('id')
  console.log(id);
  return id;
}

module.exports = {
  fetchMemberSheetData,
  fetchEventSheetData,
  extractID,
  getFile
}
