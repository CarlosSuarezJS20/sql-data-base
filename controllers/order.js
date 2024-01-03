exports.getOrders = (req, res) => {};

exports.postOrder = (req, res) => {
  const currentUser = req.user;
  let products;
  let currentCart;
  currentUser
    .getCart()
    .then((cart) => {
      return cart;
    })
    .then((cart) => {
      currentCart = cart;
      return cart.getProducts();
    })
    .then((cartProducts) => {
      return cartProducts;
    })
    .then((cartProducts) => {
      products = cartProducts;
      return currentUser.createOrder();
    })
    .then((order) => {
      return products.forEach((prod) =>
        order.addProduct(prod, {
          through: { quantity: prod.cartItem.quantity },
        })
      );
    })
    .then(() => {
      return currentCart.setProducts(null);
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
};
