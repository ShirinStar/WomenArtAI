const express = require('express');
const router = express.Router();
const {extractID, getFile} = require ('./imageFile');
const fs = require('fs');
const image = require("image-data-uri");
const axios = require('axios');
const readline = require('readline');
const {google} = require('googleapis');
const _ = require('lodash');
const key = process.env.API_KEY;
SHEET_URL= 'https://sheets.googleapis.com/';

let img;
let buf;

const sheets = google.sheets({
	version: 'v4',
	auth: process.env.API_KEY
});
const drive = google.drive({
  auth: process.env.API_KEY,
  version: 'v2'
});
const runner = async () => {

const file = await drive.files.get({
  fileId: '1-4p7GhCYHzx3YRkFewaTaKf_iIAQmQIg',
});

const link = file.thumbnailLink;
}
runner();

const params = { 
  spreadsheetId: process.env.ANSWER_SHEET_ID,
  range: '!B:N'
};


function parsePersonData(person) {
  const name = person['Full name'];
  const email = person.email;
  const headshot = person['headshot'];
  const bio = person['Short Bio'];
  const portfolio = person['Portfolio image'];
  const site = person.Website;
  const linkedin = person.Linkedin;
  return {name, email, headshot, bio, portfolio, site, linkedin}
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  const sheetData = await sheets.spreadsheets.values.get(params)
  const records = sheetData.data.values.slice(1).map(row => {
    console.log('hi')
      return row.reduce((person, cell, idx) => {
          const key = sheetData.data.values[0][idx];
          person[key] = cell;
          return person;
        }, {});
    })
    .filter(person => person['Overall Status'] === 'Complete')
    const dataPromise = records.map(person => {
      return parsePersonData(person)
    })
    .map( async (person) => {
      const url = person.headshot;
      const id = extractID(url);
      const file = await getFile(id);
      const thumbnailLink = file.data.thumbnailLink;
      return {
        ...person, headshot:thumbnailLink
      }

    })
    const data = await Promise.all(dataPromise)
    console.log(data)
    let randData = _.shuffle(data);

     const samplePerson =  data.map(person => {
      const name = person.name;
      const portfolio = person.portfolio;
      const site = person.site;
      return {name, portfolio, site}
    })

      let randPerson = _.sample(samplePerson);
    
  res.render('index', {
    page: 'WOMEN ART AI', 
    menuId: 'home', 
    randData: randData,
    randPerson: randPerson
  });
});

module.exports = router;