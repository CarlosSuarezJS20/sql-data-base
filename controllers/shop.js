const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const currentProducts = await Product.findAll();
    res.render("shop/product-list", {
      prods: currentProducts,
      pageTitle: "Product List",
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  const selectedProd = await Product.findByPk(productId);
  res.render("shop/product-detail", {
    product: selectedProd,
    pageTitle: selectedProd.title,
    path: "/products",
  });
  try {
  } catch (error) {
    console.log(error);
    console.log("Product not found");
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const currentProducts = await Product.findAll();
    res.render("shop/index", {
      prods: currentProducts,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
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
