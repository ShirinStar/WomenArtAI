const pgp = require ('pg-promise');
const db = pgp()(process.env.DATABASE_URL || {
  host:'localhost', database: 'womenai'
})

async function createDatabase() {
  try {
    await db.query(`
      CREATE TABLE people
      (
        user_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        headshot TEXT,
        email TEXT UNIQUE NOT NULL, 
        bio TEXT,
        portfolio TEXT,
        site TEXT, 
        linkedin TEXT,
        instagram TEXT
        )`,
        )} catch (e) {
    console.log(e);
  }
  try {
    await db.query(`
      CREATE TABLE event
      (
        event_id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL, 
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        total_time TEXT NOT NULL,
        description TEXT NOT NULL,
        link TEXT
        )`,
        )} catch (e) {
    console.log(e);
  }
}

async function readPeople() {
  try {
    const dataPeople = await db.any('select * from people');
    return dataPeople;
  } catch (e) {
    console.error(e);
  }
}

async function readEvent() {
  try {
    const dataEvent = await db.any('select * from event');
    return dataEvent;
  } catch (e) {
    console.error(e);
  }
}


async function savePeople(person) {
  if (person === undefined) {
    return;
  }
  try {
    const saveData = await db.any(`
  INSERT INTO people
  (name, headshot, email, bio, portfolio, site, linkedin, instagram)
  VALUES (
    $1,
    $2,
    $3, 
    $4,
    $5,
    $6,
    $7,
    $8
  )`, [
      person.name,
      person.headshot,
      person.email,
      person.bio,
      person.portfolio,
      person.site,
      person.linkedin,
      person.instagram
    ]
    )
    return saveData;
  } catch (e) {
    console.error(e);
  }
}

async function saveEvent(event) {
  if (event === undefined) {
    return;
  }
  try {
    const saveData = await db.any(`
  INSERT INTO event
  (key, name, email, title, date, total_time, description, link)
  VALUES (
    $1,
    $2,
    $3, 
    $4,
    $5,
    $6, 
    $7,
    $8
  )`, [
      event.key,
      event.name,
      event.email,
      event.title,
      event.date,
      event.totalTime,
      event.description,
      event.link
    ]
    )
    return saveData;
  } catch (e) {
    console.error(e);
  }
}


async function getEmails() {
  try {
    const emails = await db.any('select email from people');
    return emails;
  } catch (e) {
    console.error(e);
  }
}

async function getKeys(){
  try {
    const keys = await db.any('select key from event');
    return keys;
  } catch (e) {
    console.error(e);
 }
}

module.exports = {
  createDatabase,
  readPeople,
  savePeople,
  readEvent,
  saveEvent,
  getEmails,
  getKeys
}