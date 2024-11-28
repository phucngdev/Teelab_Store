const orderService = require("../services/order.service");
const jwt = require("jsonwebtoken");

// tạo mới đơn hàng
module.exports.createOrder = async (req, res) => {
  try {
    // gọi đến service gửi theo body
    const result = await orderService.createOrderService(req.body);
    // trả về status và kết quả
    return res.status(201).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// lấy tất cả đơn hàng của 1 user
module.exports.getAllOrderByUser = async (req, res) => {
  try {
    // gọi đến service gửi theo user id
    const result = await orderService.getAllOrderByUserService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// lấy tất cả đơn hàng (admin)
module.exports.getAllOrder = async (req, res) => {
  try {
    // lấy page, limit, và status từ query params
    const { page, limit, status } = req.query;
    // gọi đến service gửi theo page, limit, và status
    const result = await orderService.getAllOrderService(page, limit, status);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// lấy thông tin 1 đơn hàng
module.exports.getOneOrder = async (req, res) => {
  try {
    // gọi đến service gửi theo id đơn hàng
    const result = await orderService.getOneOrderService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// tạo order với zalopay
module.exports.createOrderWithZalopay = async (req, res) => {
  try {
    // gọi đến service gửi theo body
    const result = await orderService.createOrderWithZalopayService(req.body);
    // trả về status và kết quả
    return res.status(201).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// sau khi thanh toán thì zalopay sẽ gọi đến callback này
module.exports.zalopayCallBack = async (req, res) => {
  try {
    // gọi đến service gửi theo body
    const result = await orderService.zalopayCallBackService(req.body);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// sau khi thanh toán, kiểm tra trạng thái thanh toán
module.exports.zalopayCheckStatus = async (req, res) => {
  try {
    // gọi đến service gửi theo app_trans_id của đơn hàng
    const result = await orderService.zalopayCheckStatusService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// update trạng thái của đơn hàng (mới | chuẩn bị | giao hàng | hoàn thành)
module.exports.updateStatusOrder = async (req, res) => {
  try {
    // gọi đến service gửi theo trạng thái, id đơn hàng
    const result = await orderService.updateStatusOrderService(
      req.body.status,
      req.params.id
    );
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};
