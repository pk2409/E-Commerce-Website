//used to create and help with relative paths
const path = require("path");

module.exports = path.dirname(require.main.filename); 
// require.main.filename gives us the path for the file which is responsible for our application running
//we put this value into dirname to give us the path to this directory



