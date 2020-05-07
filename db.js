const pgp = require ('pg-promise');
const db = pgp()({ host: 'localhost', database: 'womenai' })


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
        linkedin TEXT
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
  if (person === undefined) {
    return;
  }
  try {
    const saveData = await db.any(`
  INSERT INTO people
  (name, headshot, email, bio, portfolio, site, linkedin)
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

async function getEmails() {
  try {
    const emails = await db.any('select email from people');
    return emails;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  createDatabase,
  read,
  save,
  getEmails
}