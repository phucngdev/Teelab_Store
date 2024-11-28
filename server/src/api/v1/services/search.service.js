const pool = require("../../../config/database");

module.exports.searchGlobalService = async (q) => {
  try {
    const query = `
      SELECT 'products' AS table_name, product_name AS result_value, product_id AS path 
      FROM products WHERE product_name LIKE ?
      UNION ALL
      SELECT 'orders' AS table_name, order_id AS result_value, order_id AS path
      FROM orders WHERE order_id LIKE ?
      UNION ALL
      SELECT 'users' AS table_name, COALESCE(username, email) AS result_value, room_id AS path 
      FROM users WHERE username LIKE ? OR email LIKE ?
      UNION ALL
      SELECT 'categories' AS table_name, category_name AS result_value, category_id AS path
      FROM categories WHERE category_name LIKE ?;`;

    // Thực hiện truy vấn tìm kiếm với các tham số
    const [results] = await pool.execute(query, [
      `%${q}%`,
      `%${q}%`,
      `%${q}%`,
      `%${q}%`,
      `%${q}%`,
    ]);

    return results;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
