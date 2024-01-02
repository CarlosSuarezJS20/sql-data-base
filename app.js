const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

// Tables
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// storing the user in the req.for development process
app.use((req, res, next) => {
  User.findByPk(9)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

// Associations definitions
User.hasOne(Product, { constraints: true, onDelete: "CASCADE" });
Product.belongsTo(User);
User.hasMany(Product);
// Cart associations
User.hasOne(Cart, { onDelete: "CASCADE", constraints: true, unique: true });
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// Order associations
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// create tables by default and does not overrides\ for overriding you need to pass an object with a key: force and value true

const createCartHelper = async (user) => {
  try {
    const cart = user.createCart();
  } catch (error) {
    console.log(error);
  }
};

// helper function to create a user on the fly until later when I create authetication
const createUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      app.listen(3000);
      return user;
    } else {
      const newUser = await User.create({
        name: "Carlos Suarez",
        email: "carlos@hotmail.com",
        role: "admin",
      });
      createCartHelper(newUser);
      app.listen(3000);
      return newUser;
    }
  } catch (error) {
    console.log(error);
  }
};

sequelize
  .sync({ alter: true })
  .then((res) => {
    try {
      createUser(9);
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.log(error);
  });
