const { google } = require('googleapis');
const key = process.env.API_KEY;
SHEET_URL = 'https://sheets.googleapis.com/';


async function fetchSpreadSheetData() {
  const sheets = google.sheets({
    version: 'v4',
    auth: process.env.API_KEY
  });

  const params = {
    spreadsheetId: process.env.ANSWER_SHEET_ID,
    range: '!B:M'
  };

  const sheetData = await sheets.spreadsheets.values.get(params)
  const records = sheetData.data.values.slice(1).map(row => {
    return row.reduce((person, cell, idx) => {
      const key = sheetData.data.values[0][idx];
      person[key] = cell;
      return person;
    }, {});
  })
  return records;
}

const getFile = async (id) => {
  const drive = google.drive({
    auth: process.env.API_KEY,
    version: 'v3'
  });
  const file = await drive.files.get({
    fileId: id,
    fields: 'thumbnailLink'
  })
  return file
};

function extractID(urlString) {
  const url = new URL(urlString)
  const id = url.searchParams.get('id')
  console.log(id);
  return id;
}

module.exports = {
  fetchSpreadSheetData,
  extractID,
  getFile
}