const { readPeople } = require('./db');
async function main() {
  try {
    const resp = await readPeople();
    console.log("response: ", resp);
  } finally {
    process.exit();
  }
}

main();