const pgp = require ('pg-promise');
const db = pgp()({ host: 'localhost', database: 'womenai' })


async function createDatabase() {
  try {
    await db.query(`
      CREATE TABLE people
      (
        user_id SERIAL PRIMARY KEY,
        full_name TEXT UNIQUE,
        headshot TEXT UNIQUE,
        email TEXT UNIQUE, 
        bio TEXT UNIQUE,
        protfolio TEXT UNIQUE,
        site TEXT UNIQUE, 
        linkedin TEXT UNIQUE
        )`,
        )} catch (e) {
    console.log(e);
  }
}


async function read() {
  try {
    const data = await db.any('select * from people');
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function save(person) {
  try {
    const saveData = await db.any(`
  INSERT INTO people
  (full_name, headshot, email, bio, portfolio, site, linkedin)
  VALUES (
    $1,
    $2,
    $3, 
    $4,
    $5,
    $6,
    $7
  )`, [
      person.name,
      person.headshot,
      person.email,
      person.bio,
      person.portfolio,
      person.site,
      person.linkedin
    ]
    )
    return saveData;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  createDatabase, read, save
}