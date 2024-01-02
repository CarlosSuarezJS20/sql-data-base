exports.getOrder = (req, res) => {
  const currentUser = req.user;
  console.log(currentUser);
  res.redirect("/orders");
};

exports.postOrder = (req, res, next) => {};
