//part of the shop that the user sees

//path is a core module used to import files with their relative path
//__dirname is a global variable that gives the absolute path of the current file of our prohect folder
const path = require('path');

const rootDir=require('../util/path');

const express=require('express');

const router= express.Router();

router.get("/", (request, response, next) => {
  response.sendFile(path.join(rootDir,"views","shop.html"));  // we do not add / , path join creates a path that works in all OS
});



module.exports=router;