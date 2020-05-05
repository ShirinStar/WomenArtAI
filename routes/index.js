const express = require('express');
const router = express.Router();
const {extractID, getFile} = require('./imageFile');
const fs = require('fs');
const image = require("image-data-uri");
const axios = require('axios');
const readline = require('readline');
const { google } = require('googleapis');
const _ = require('lodash');
const key = process.env.API_KEY;
SHEET_URL = 'https://sheets.googleapis.com/';


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

/* GET home page. */
router.get('/', async function (req, res, next) {
//from here
  const records = sheetData.data.values.slice(1).map(row => {
    return row.reduce((person, cell, idx) => {
      const key = sheetData.data.values[0][idx];
      person[key] = cell;
      return person;
    }, {});
  })
  // to here is done
    // .filter(person => person['Overall Status'] === 'Complete')
  const dataPromise = records.map(person => {
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

  const data = await Promise.all(dataPromise)
  console.log(data)
  let randData = _.shuffle(data);

  const samplePerson = data.map(person => {
    const name = person.name;
    const portfolio = person.portfolio;
    const site = person.site;
    return { name, portfolio, site }
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