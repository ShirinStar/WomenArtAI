const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { readPeople, readEvent } = require('../db');

/* GET home page. */
router.get('/', async function (req, res, next) {
const personData = await readPeople();
const eventData = await readEvent();
  let randData = _.shuffle(personData);
  const samplePerson = personData.map(person => {
    const name = person.name;
    const portfolio = person.portfolio;
    const site = person.site;
    return { name, portfolio, site }
  })
   let randPerson = _.sample(samplePerson);

   const events = eventData.map(event => {
     const date = event.date;
     const title = event.title;
     const name = event.name;
     const email = event.email;
     const description = event.description;
     const link = event.link;
     return { date, title, name, email, description, link }
   })

   console.log(events)

  res.render('index', {
    page: 'WOMEN ART AI',
    menuId: 'home',
    randData,
    randPerson,
    events
  });

});
module.exports = router;