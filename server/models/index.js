const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = `${process.env.MONGODB_URI}`;

main().catch(err => console.log(err));

async function main () {
  try {
    await mongoose.connect(url);
    console.log('Connected to DB!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = mongoose;