const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const _ = require('lodash');

url = 'https://randomuser.me/api/';
SHEET_URL= 'https://sheets.googleapis.com/';

const sheets = google.sheets({
	version: 'v4',
	auth: process.env.API_KEY
});

const params = { 
  spreadsheetId: process.env.ANSWER_SHEET_ID,
  range: '!B:M'
};

/* GET home page. */
router.get('/', async function(req, res, next) {
  const sheetData = await sheets.spreadsheets.values.get(params)
  const records = sheetData.data.values.slice(1).map(row => {
      return row.reduce((person, cell, idx) => {
          const key = sheetData.data.values[0][idx];
          person[key] = cell;
          return person;
        }, {});
    })
    .filter(person => person['Overall Status'] === 'Complete')
    const data = records.map(person => {
      const name = person['Full name'];
      const email = person.email;
      const headshot = person['Profile image'];
      const bio = person['Short Bio'];
      const portfolio = person['Portfolio image'];
      const site = person.Website;
      const linkedin = person.Linkedin;
      return {name, email, headshot, bio, portfolio, site, linkedin}
    })
    console.log(data);

     const samplePerson =  data.map(person => {
      const name = person.name;
      const portfolio = person.portfolio;
      const site = person.site;
      return {name, portfolio, site}
    })
      let randPerson = _.sample(samplePerson)
      console.log("randPerson", randPerson)
    
  res.render('index', {
    page: 'WOMEN ART AI', 
    menuId: 'home', 
    data: data,
    randPerson: randPerson
  });

});

module.exports = router;