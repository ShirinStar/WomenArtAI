const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { read } = require('../db');

/* GET home page. */
router.get('/', async function (req, res, next) {
const personData = await read();
  let randData = _.shuffle(personData);
  const samplePerson = personData.map(person => {
    const name = person.name;
    const portfolio = person.portfolio;
    const site = person.site;
    return { name, portfolio, site }
  })
   let randPerson = _.sample(samplePerson);

  res.render('index', {
    page: 'WOMEN ART AI',
    menuId: 'home',
    randData,
    randPerson
  });

});
module.exports = router;