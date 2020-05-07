const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { read } = require('../db');

/* GET home page. */
router.get('/', async function (req, res, next) {
//from here
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
    randData: randData,
    randPerson
  });

});
https://lh3.googleusercontent.com/8wfmEfIRYGeE55Qcc5rvz6Eu_O_goIHUAHGfFUspvKuHkSNhtE-34HoeNEK1AI1a1neVSvXUo-c=s220
module.exports = router;