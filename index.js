const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const errorController = require("./controllers/error");

const sequelize = require("./util/db");

const Product = require("./models/product");
const User = require("./models/user");

app.set("view engine", "ejs"); //allows to set any values globally on our express application
//views-engine tells which engine to use to render the views
//views tells where we can find those views
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); //this will grant access to the public folder directly
//any request that tries to access a file will be directed to the public folder

app.use((request, response, next) => {
  User.findByPk(1)
    .then((user) => {
      request.user = user;
      next(); //can add properties to request object
    })
    .catch((err) => console.log(err));
}); //so that we can find user and assign it for every request

app.use("/admin", adminRoutes.routes); //not as a function but as an object , it will automatically call the router object and execute the routes and consider the routes as a middleware
app.use(shopRoutes); //not as a function but as an object , it will automatically call the router object and execute the routes and consider the routes as a middleware

//for an error page to handle all incoming requests not already handled by the code given above
app.use(errorController.geterror);

// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

//before syncing all the data to the database , we need to define our models

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem }); //through tells sequelize where these relations must be stored
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync() //not just create tables but also define relations,overwrites only if we write force:true
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Harry Potter", email: "hogwarts@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

//module.exports = path.dirname(require.main.filename);
