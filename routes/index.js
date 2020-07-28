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
   try {
      const name = person.name;
      const portfolio = person.portfolio;
      const site = person.site;
      return { name, portfolio, site }
  } catch(e){
      console.error(e);
  }})

   let randPerson = _.sample(samplePerson);
   const events = eventData.map(event => {
     const date = event.date;
     const title = event.title;
     const name = event.name;
     const email = event.email;
     const totalTime = event.total_time;
     const description = event.description;
     const link = event.link;
    
     return {  date, title, name, email, totalTime, description, link }
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