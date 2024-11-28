const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");

module.exports.addToCartService = async (id, body) => {
  try {
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );

    const [[item]] = await pool.execute(
      "SELECT * FROM cart_item WHERE product_id = ? AND color_size_id = ?",
      [body.product_id, body.color_size_id]
    );

    // kiểm tra số lượng trong giỏ hàng có vượt quá số lượng sẵn có kko
    const [[{ quantity }]] = await pool.query(
      `
      SELECT 
       quantity
      FROM sizes
      WHERE size_id = (SELECT size_id FROM color_size WHERE color_size_id = ?)`,
      [body.color_size_id]
    );

    if (item) {
      if (item.quantity >= quantity) {
        return { status: 400, message: "Quantity exceeds available stock" };
      }
      const updatedQuantity = item.quantity + body.quantity;
      await pool.execute(
        "UPDATE cart_item SET quantity = ? WHERE cart_item_id = ?",
        [updatedQuantity, item.cart_item_id]
      );
      return {
        status: 201,
        message: "Update quantity in cart successfully",
      };
    }

    const cartItemId = uuidv4();
    await pool.execute(
      "INSERT INTO cart_item (cart_item_id, cart_id, product_id, color_size_id, quantity) VALUES (?, ?, ?, ?, ?)",
      [
        cartItemId,
        user.cart_id,
        body.product_id,
        body.color_size_id,
        body.quantity,
      ]
    );

    return {
      status: 201,
      message: "Add to cart successfully",
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getCartByIdService = async (id) => {
  try {
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );

    const [cartRows] = await pool.execute(
      `SELECT 
            c.cart_id,
            ci.cart_item_id, ci.quantity,
            p.product_id, p.product_name, p.thumbnail, p.price,
            cs.color_size_id,
            cl.color_name, 
            s.size_name, s.quantity AS quantity_size
        FROM carts c
        JOIN cart_item ci ON c.cart_id = ci.cart_id
        JOIN products p ON ci.product_id = p.product_id
        JOIN color_size cs ON ci.color_size_id = cs.color_size_id
        JOIN colors cl ON cs.color_id = cl.color_id
        JOIN sizes s ON cs.size_id = s.size_id
        WHERE c.cart_id = ?`,
      [user.cart_id]
    );

    if (cartRows.length === 0) {
      return {
        items: [],
      };
    }

    const cart = {
      cart_id: cartRows[0].cart_id,
      items: cartRows.map((row) => ({
        cart_item_id: row.cart_item_id,
        quantity: row.quantity,
        product: {
          product_id: row.product_id,
          product_name: row.product_name,
          thumbnail: row.thumbnail,
          price: row.price,
        },
        color_size: {
          color_size_id: row.color_size_id,
          color_name: row.color_name,
          size_name: row.size_name,
          quantity: row.quantity_size,
        },
      })),
    };

    return cart;
  } catch (error) {
    console.log(error.message);
    return { status: 500, message: error.message };
  }
};

module.exports.updateCartService = async (body) => {
  try {
    const [cart_item_check] = await pool.execute(
      "SELECT * FROM cart_item WHERE cart_id = ? AND cart_item_id = ?",
      [body.cart_id, body.cart_item_id]
    );

    if (!cart_item_check) {
      return { status: 404, message: "Cart item not found" };
    }

    await pool.execute(
      "UPDATE cart_item SET update_at = NOW(), quantity = ?  WHERE cart_item_id = ?",
      [body.quantity, body.cart_item_id]
    );

    return { status: 200, message: "Cart updated successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deleteCartItemService = async (id) => {
  try {
    const cart_item = await pool.execute(
      "SELECT * FROM cart_item WHERE cart_item_id = ?",
      [id]
    );

    if (!cart_item) {
      return { status: 404, message: "Cart item not found" };
    }
    await pool.execute("DELETE FROM cart_item WHERE cart_item_id = ?", [id]);

    return { status: 200, message: "Cart item deleted successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
