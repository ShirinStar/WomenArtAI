const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const _ = require('lodash');
require('dotenv').config();
const key = process.env.API_KEY;

const drive = google.drive({
  auth: process.env.API_KEY,
  version: 'v2'
});

const getFile = async (id) => {
 const file = await drive.files.get({
  fileId: id
 })
 return file
};

const url = "https://drive.google.com/open?id=1-4p7GhCYHzx3YRkFewaTaKf_iIAQmQIg";
const id = extractID(url);
getFile(id);

const urlSec = "https://drive.google.com/open?id=1rq3OtNBpg89UyzdY46QXqzZYOjEsOe-V";


function extractID(urlString) { 
  const url = new URL(urlString)
  const id = url.searchParams.get('id')
  return id;
} 

module.exports = {extractID, getFile};