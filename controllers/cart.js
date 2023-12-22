exports.getCart = async (req, res, next) => {
  try {
    const currentCart = await req.user.getCart();
    console.log("cart", currentCart);
    if (!currentCart) {
      try {
        const createCart = await req.user.createCart();

        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: createCart,
        });
      } catch (error) {
        console.log(error);
      }
    }
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: currentCart,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = (req, res, next) => {
  //   const prodId = req.body.productId;
  //   Product.findById(prodId, (product) => {
  //     Cart.addProduct(prodId, product.price);
  //   });
  //   res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  //   const prodId = req.body.productId;
  //   Product.findById(prodId, (product) => {
  //     Cart.deleteProduct(prodId, product.price);
  //     res.redirect("/cart");
  //   });
};
