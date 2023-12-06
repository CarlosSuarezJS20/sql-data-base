const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  try {
    const currentProducts = await Product.findAll();
    console.log(currentProducts);
    res.render("shop/index", {
      prods: currentProducts,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  const selecteProd = await Product.findByPk(productId);
  res.render("shop/product-detail", {
    product: selecteProd,
    pageTitle: selecteProd.title,
    path: "/products",
  });
  console.log(selecteProd);
  try {
  } catch (error) {
    console.log(error);
    console.log("Product not found");
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const currentProducts = await Product.findAll(req.body.id);
    console.log(currentProducts);
    res.render("shop/index", {
      prods: currentProducts,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
