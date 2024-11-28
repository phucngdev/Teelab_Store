const nodemailer = require("nodemailer");
const pool = require("../../../config/database");
const format = require("../utils/format");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.PASSWORD_EMAIL_ADMIN,
  },
});

module.exports.sendMailNewProduct = async (body) => {
  try {
    const [users] = await pool.execute(
      "SELECT email FROM users WHERE status = 1"
    );

    const recipientEmails = users.map((user) => user.email).join(", ");

    const mailOptions = {
      from: `"TEELAB" <${process.env.EMAIL_ADMIN}>`,
      to: recipientEmails,
      subject: "Khám phá sản phẩm mới từ TEELAB!",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #ffffff; padding: 30px 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center;">
              <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/logo.png?1710226595388" alt="TEELAB Logo" style="max-width: 150px; margin-bottom: 30px;">
            </div>
            <h1 style="font-size: 28px; color: #333; text-align: center;">✨ Sản Phẩm Mới Đã Có Mặt! ✨</h1>
            <p style="color: #555; font-size: 16px; line-height: 1.8; text-align: center; margin: 20px 0;">
              TEELAB rất hào hứng giới thiệu đến bạn sản phẩm mới của chúng tôi. Với thiết kế ấn tượng và mức giá ưu đãi, đây sẽ là lựa chọn hoàn hảo dành cho bạn!
            </p>
          </div>
          <div style="background-color: #ffffff; padding: 30px; margin-top: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center;">
              <img 
                src="${body.thumbnail}" 
                alt="${body.product_name}" 
                style="width: 100%; max-width: 500px; border-radius: 10px; margin-bottom: 20px;" 
              />
            </div>
            <h2 style="font-size: 24px; color: #333; text-align: center; margin-bottom: 20px;">
              ${body.product_name}
            </h2>
            <p style="color: #555; text-align: center; font-size: 18px;">
              Giá bán: 
              <span style="color: #e63946; font-weight: bold; font-size: 20px;">
              ${format.formatPrice(body.price)}
              </span>
            </p>
          </div>
    
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:5173/chi-tiet/${
              body.product_id
            }" style="display: inline-block; padding: 15px 40px; background-color: #007bff; color: white; text-decoration: none; font-size: 18px; font-weight: bold; border-radius: 5px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.3s ease;">
              Xem sản phẩm ngay
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 40px 0;">
          <div style="text-align: center; color: #888; font-size: 14px;">
            <p>Bạn nhận được email này vì bạn là khách hàng của TEELAB.</p>
            <p style="margin-top: 10px;">
              <a href="#" style="color: #007bff; text-decoration: underline;">
                Hủy đăng ký
              </a> 
              nếu bạn không muốn nhận thêm email từ chúng tôi.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { status: 200, message: "Email sent successfully" };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.sendMailNewOrder = async (order_id) => {
  const [[orderDb]] = await pool.execute(
    `
   SELECT 
    o.order_id,
    o.total,
    o.transaction,
    o.payment_status,
    o.status AS order_status,
    o.address,
    o.city,
    o.district,
    o.ward,
    o.phone,
    o.username,
    o.email,
    o.note,
    o.created_at AS order_created_at,
    o.update_at AS order_updated_at,
    
    GROUP_CONCAT(
        CONCAT(
            'order_detail_id: ', od.order_detail_id, 
            ', quantity: ', od.quantity, 
            ', price: ', od.price,
            ', product_id: ', p.product_id, 
            ', product_name: ', p.product_name, 
            ', thumbnail: ', p.thumbnail,
            ', color_size_id: ', cs.color_size_id, 
            ', color_name: ', c.color_name, 
            ', size_name: ', s.size_name
        ) 
        SEPARATOR ' | '
    ) AS order_details
    FROM orders o
    LEFT JOIN order_details od ON o.order_id = od.order_id
    LEFT JOIN products p ON od.product_id = p.product_id
    LEFT JOIN color_size cs ON od.color_size_id = cs.color_size_id
    LEFT JOIN colors c ON cs.color_id = c.color_id
    LEFT JOIN sizes s ON cs.size_id = s.size_id
    WHERE o.order_id = ?
    GROUP BY o.order_id`,
    [order_id]
  );

  function formatOrderData(order) {
    // Check if order and order_details exist
    if (!order || !order.order_details) return null;

    const detailsArray = order.order_details.split(" | ");

    const orderDetails = detailsArray.map((detail) => {
      const detailParts = detail.split(", ");

      const orderDetailId = detailParts[0].split(": ")[1];
      const quantity = parseInt(detailParts[1].split(": ")[1]);
      const price = detailParts[2].split(": ")[1];
      const productId = detailParts[3].split(": ")[1];
      const productName = detailParts[4].split(": ")[1];
      const thumbnail = detailParts[5].split(": ")[1];
      const colorSizeId = detailParts[6].split(": ")[1];
      const colorName = detailParts[7].split(": ")[1];
      const sizeName = detailParts[8].split(": ")[1];

      const item = {
        order_detail_id: orderDetailId,
        quantity: quantity,
        price: +price,
        product: {
          product_id: productId,
          product_name: productName,
          thumbnail: thumbnail,
        },
        color_size: {
          color_size_id: colorSizeId,
          color_name: colorName,
          size_name: sizeName,
        },
      };
      return item;
    });

    return {
      order_id: order.order_id,
      total: order.total,
      transaction: order.transaction,
      payment_status: order.payment_status,
      order_status: order.order_status,
      address: order.address,
      city: order.city,
      district: order.district,
      ward: order.ward,
      phone: order.phone,
      username: order.username,
      email: order.email,
      note: order.note,
      order_created_at: new Date(order.order_created_at).toISOString(),
      order_updated_at: new Date(order.order_updated_at).toISOString(),
      order_details: orderDetails,
    };
  }

  try {
    const order = formatOrderData(orderDb);

    const mailOptions = {
      from: `"TEELAB" <${process.env.EMAIL_ADMIN}>`,
      to: order.email,
      subject: "Thông tin đơn hàng từ TEELAB!",
      html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #ffffff; padding: 30px 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center;">
            <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/logo.png?1710226595388" alt="TEELAB Logo" style="max-width: 150px; margin-bottom: 30px;">
          </div>
          <h1 style="font-size: 28px; color: #333; text-align: center;">✨ Đơn Hàng Của Bạn ✨</h1>
          <p>Hi ${order.username},</p>
          <p>Cảm ơn bạn đã đặt hàng, Mã đơn hàng của bạn là: <strong>${order_id}</strong>.</p>
          <h2>Địa chỉ nhận hàng:</h2>
          <p>Tỉnh/Thành phố: ${order.city}</p>
          <p>Quận/Huyện: ${order.district}</p>
          <p>Phường/Xã: ${order.ward}</p>
          <p>Địa chỉ: ${order.address}</p>
          <p>Số điện thoại: ${order.phone}</p>
          <p>Ghi chú: ${order.note}</p>
          <h2>Chi tiết sản phẩm:</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center">Ảnh</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center">Tên sản phẩm</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center">Màu</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center">Size</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center">SL</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center">Giá</th>
              </tr>
            </thead>
            <tbody>
              ${order.order_details.map(
                (o) => ` 
                <tr key=${o.order_detail_id}>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: center">
                    <img 
                      style="width: 100%; height: 100%; object-fit: cover"
                      src="${o.product.thumbnail}" 
                      alt=" ${o.product.product_name}" 
                    />
                  </td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: center">
                    ${o.product.product_name}
                  </td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: center">
                    ${o.color_size.color_name}
                  </td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: center">
                    ${o.color_size.size_name}
                  </td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: center">
                    ${o.quantity}
                  </td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: center">
                    ${format.formatPrice(o.price)}
                  </td>
                </tr>`
              )}
            </tbody>
          </table>
          <p>Phí vận chuyển: 20.000 đ</p>
          <p>
            <strong>Tổng giá trị đơn hàng: </strong>
            ${format.formatPrice(order.total)}
          </p>
          <p>Cảm ơn bạn đã tin tưởng và ủng hộ Teelab</p>
        </div>
      </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    return { status: 200, message: "Email sent successfully" };
  } catch (error) {
    console.log(error.message);
  }
};
