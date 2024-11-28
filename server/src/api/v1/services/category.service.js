const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");

module.exports.createCategoryService = async (body) => {
  try {
    // kiểm tra xem category_name và path có chưa
    const [checkValue] = await pool.execute(
      "SELECT * FROM categories WHERE category_name = ? OR path = ?",
      [body.category_name, body.path]
    );
    if (checkValue.length > 0) {
      return { status: 400, message: "Category name or path already exists" };
    }

    // Tạo category_id mới bằng uuid
    const categoryId = uuidv4();

    // thêm mới category vào database
    await pool.execute(
      "INSERT INTO categories (category_id, category_name, path) VALUES (?, ?, ?)",
      [categoryId, body.category_name, body.path]
    );
    return { status: 201, message: "Category created successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getAllCategoryService = async () => {
  try {
    const [result] = await pool.execute(`
      SELECT c.*, COUNT(p.product_id) AS product_count
      FROM categories c
      LEFT JOIN products p ON c.category_id = p.category_id
      GROUP BY c.category_id
      ORDER BY c.category_index ASC
    `);
    return result;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deleteCategoryService = async (id) => {
  try {
    // kiểm tra xem category_id có tồn tại hay không
    const [checkValue] = await pool.execute(
      "SELECT * FROM categories WHERE category_id =?",
      [id]
    );
    if (checkValue.length === 0) {
      return { status: 404, message: "Category not found" };
    }
    // Xóa category
    await pool.execute("DELETE FROM categories WHERE category_id = ?", [id]);
    return { status: 200, message: "Category deleted successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.updateCategoryService = async (id, body) => {
  try {
    // kiểm tra xem category_id có tồn tại hay không
    const [checkValue] = await pool.execute(
      "SELECT * FROM categories WHERE category_id = ?",
      [id]
    );
    if (checkValue.length === 0) {
      return { status: 404, message: "Category not found" };
    }
    // kiểm tra xem category_name và path có chưa
    const [checkValue2] = await pool.execute(
      "SELECT * FROM categories WHERE (category_name = ? OR path = ?) AND category_id != ?",
      [body.category_name, body.path, id]
    );
    console.log(checkValue2, id);

    if (checkValue2.length > 0) {
      return { status: 400, message: "Category name or path already exists" };
    }
    // Cập nhật category vào database
    await pool.execute(
      "UPDATE categories SET category_name = ?, path = ? WHERE category_id = ?",
      [body.category_name, body.path, id]
    );
    return { status: 200, message: "Category updated successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
