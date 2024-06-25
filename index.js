const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.set("view engine", "ejs"); //allows to set any values globally on our express application
//views-engine tells which engine to use to render the views
//views tells where we can find those views
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); //this will grant access to the public folder directly
//any request that tries to access a file will be directed to the public folder

app.use("/admin", adminData.routes).render("add-product",{pageTitle: "Add Product"}); //not as a function but as an object , it will automatically call the router object and execute the routes and consider the routes as a middleware
app.use(shopRoutes); //not as a function but as an object , it will automatically call the router object and execute the routes and consider the routes as a middleware

//for an error page to handle all incoming requests not already handled by the code given above
app.use((request, response, next) => {
  // response.status(404).sendFile(path.join(__dirname, "views", "notfound.html"));
  response.status(404).render("notfound", { pageTitle: "Page Not Found" });
});
app.listen(3000);

//module.exports = path.dirname(require.main.filename);
