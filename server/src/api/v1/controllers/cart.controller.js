const cartService = require("../services/cart.service");
const jwt = require("jsonwebtoken");

// thêm sản phẩm vào giỏ hàng
module.exports.addToCart = async (req, res) => {
  try {
    const result = await cartService.addToCartService(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// lấy thông tin giỏ hàng của user
module.exports.getCartById = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_ACCESS_KEY
    );
    const result = await cartService.getCartByIdService(decoded.user_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//
module.exports.updateCart = async (req, res) => {
  try {
    const result = await cartService.updateCartService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// xoá sản phẩm khỏi giỏ hàng
module.exports.deleteCartItem = async (req, res) => {
  try {
    const result = await cartService.deleteCartItemService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
