const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");
const emailService = require("./mail.service");

module.exports.getAllService = async (page, limit) => {
  try {
    // kiểm tra xem page và limit có phải số và > 0 hay không
    // phân trang
    // lấy offset (vị trí bắt đầu lấy)
    const offset = parseInt((page - 1) * limit);
    const limitValue = parseInt(limit, 10);
    const pageValue = parseInt(page, 10);
    const offsetValue = parseInt(offset, 10);
    // lấy tổng số sản phẩm và danh sách sản phẩm
    // const [[totalRows]] = await pool.execute(
    //   `SELECT COUNT(*) AS total FROM products`
    // );
    const [[[totalRows]], [products]] = await Promise.all([
      pool.execute(`SELECT COUNT(*) AS total FROM products`),
      pool.execute(
        `
          SELECT 
            p.product_id, 
            p.product_name, 
            p.thumbnail, 
            p.thumbnail_hover, 
            p.images, 
            p.discount, 
            p.description_image, 
            p.description, 
            p.price, 
            p.price_max, 
            p.status, 
            c.category_name AS category
          FROM products p
          JOIN categories c ON p.category_id = c.category_id
          ${
            pageValue > 0 && limitValue > 0
              ? `LIMIT ${limitValue} OFFSET ${offsetValue}`
              : ``
          } `
      ),
    ]);
    // lấy tổng
    const totalItems = totalRows.total;
    // tính số trang
    const totalPages = Math.ceil(totalItems / limit);
    // lấy size, color
    const productPromises = products.map(async (product) => {
      const [colorSizes] = await pool.execute(
        `SELECT 
                cs.color_size_id, 
                co.color_name, 
                co.image AS color_image, 
                s.size_name, 
                s.quantity
              FROM color_size cs
              JOIN colors co ON cs.color_id = co.color_id
              JOIN sizes s ON cs.size_id = s.size_id
              WHERE cs.product_id = ?`,
        [product.product_id]
      );
      // tạo các option từ color và size []
      const optionsMap = colorSizes.reduce((acc, cs) => {
        if (!acc[cs.color_name]) {
          acc[cs.color_name] = {
            color_name: cs.color_name,
            image: cs.color_image,
            sizes: [],
          };
        }
        acc[cs.color_name].sizes.push({
          size_name: cs.size_name,
          quantity: cs.quantity,
        });
        return acc;
      }, {});
      // chuyển mảng thành mảng object theo từng màu
      const options = Object.values(optionsMap);

      return {
        product_id: product.product_id,
        product_name: product.product_name,
        category: product.category,
        thumbnail: product.thumbnail,
        thumbnail_hover: product.thumbnail_hover,
        images: JSON.parse(product.images),
        discount: product.discount,
        description_image: product.description_image,
        description: product.description,
        price: product.price,
        price_max: product.price_max,
        status: product.status,
        option: options,
      };
    });

    const result = await Promise.all(productPromises);
    return {
      products: result,
      totalItems: result.length,
      totalPages: totalPages || 0,
      page: page,
      limit: limit,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getOneService = async (id) => {
  try {
    const [[product]] = await pool.execute(
      `
      SELECT 
        p.product_id, 
        p.product_name, 
        p.thumbnail, 
        p.thumbnail_hover, 
        p.images, 
        p.discount, 
        p.description_image, 
        p.description, 
        p.price, 
        p.price_max, 
        p.status, 
        c.category_id,
        c.category_name,
        c.path
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      WHERE p.product_id = ?
    `,
      [id]
    );

    if (!product) {
      return { status: 404, message: "Product not found" };
    }

    const [colorSize] = await pool.execute(
      `SELECT 
          cs.color_size_id,
          cs.product_id,
          cs.color_id,
          c.color_name,
          c.image,
          cs.size_id,
          s.size_name,
          s.quantity
      FROM color_size cs
      JOIN colors c ON cs.color_id = c.color_id
      JOIN sizes s ON cs.size_id = s.size_id
      WHERE cs.product_id = ?`,
      [id]
    );

    return {
      product_id: product.product_id,
      product_name: product.product_name,
      thumbnail: product.thumbnail,
      thumbnail_hover: product.thumbnail_hover,
      images: JSON.parse(product.images),
      status: product.status,
      discount: product.discount,
      description_image: product.description_image,
      description: product.description,
      price: product.price,
      price_max: product.price_max,
      category: {
        category_id: product.category_id,
        path: product.path,
        category_name: product.category_name,
      },
      colorSize,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getOneForUpdateService = async (id) => {
  try {
    const [products] = await pool.execute(
      `
      SELECT 
        p.product_id, 
        p.product_name, 
        p.thumbnail, 
        p.thumbnail_hover, 
        p.images, 
        p.discount, 
        p.description_image, 
        p.description, 
        p.price, 
        p.price_max,
        p.status, 
        c.category_name,
        c.category_id
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      WHERE p.product_id = ?
    `,
      [id]
    );

    if (products.length === 0) {
      return { status: 404, message: "Product not found" };
    }

    const product = products[0];

    const [colorSizes] = await pool.execute(
      `
      SELECT 
        cs.color_size_id, 
        cl.color_name, 
        cl.image, 
        s.size_name, 
        s.size_id,
        s.quantity
      FROM color_size cs
      JOIN colors cl ON cs.color_id = cl.color_id
      JOIN sizes s ON cs.size_id = s.size_id
      WHERE cs.product_id = ?
    `,
      [product.product_id]
    );

    const optionsMap = colorSizes.reduce((acc, cs) => {
      if (!acc[cs.color_name]) {
        acc[cs.color_name] = {
          color_size_id: cs.color_size_id,
          color_name: cs.color_name,
          image: cs.image,
          sizes: [],
        };
      }

      acc[cs.color_name].sizes.push({
        size_id: cs.size_id,
        size_name: cs.size_name,
        quantity: cs.quantity,
      });
      return acc;
    }, {});

    const options = Object.values(optionsMap);

    const result = {
      product_name: product.product_name,
      category: product.category,
      thumbnail: product.thumbnail,
      thumbnail_hover: product.thumbnail_hover,
      images: JSON.parse(product.images),
      discount: product.discount,
      description_image: product.description_image,
      description: product.description,
      price: product.price,
      price_max: product.price_max,
      status: product.status,
      category: {
        category_name: product.category_name,
        category_id: product.category_id,
      },
      option: options,
    };

    return result;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.updateProductService = async (id, body) => {
  try {
    return { status: 200, message: "Product updated successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deleteOneService = async (id) => {
  try {
    await pool.execute("DELETE FROM products WHERE product_id = ?", [id]);
    return { message: "Product deleted successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deleteAllService = async () => {
  try {
    await pool.execute("TRUNCATE TABLE products");
    return { message: "All products deleted successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.createProductService = async (body) => {
  try {
    const productId = uuidv4();
    await pool.execute(
      `INSERT INTO products (
        product_id, product_name, thumbnail, thumbnail_hover, images, discount, description_image, description, price, price_max, status, category_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productId,
        body.product_name,
        body.thumbnail,
        body.thumbnail_hover,
        JSON.stringify(body.images),
        body.discount,
        body.description_image,
        body.description,
        body.price * (1 - body.discount / 100),
        body.price,
        body.status,
        body.category,
      ]
    );

    for (const option of body.option) {
      const colorId = uuidv4();
      await pool.execute(
        `INSERT INTO colors (color_id, color_name, image) VALUES (?, ?, ?)`,
        [colorId, option.color_name, option.image]
      );

      for (const size of option.sizes) {
        const sizeId = uuidv4();
        await pool.execute(
          `INSERT INTO sizes (size_id, size_name, quantity) VALUES (?, ?, ?)`,
          [sizeId, size.size, size.quantity]
        );
        await pool.execute(
          `INSERT INTO color_size (color_size_id, product_id, color_id, size_id) VALUES (?, ?, ?, ?)`,
          [uuidv4(), productId, colorId, sizeId]
        );
      }
    }

    if (body.status === "1") {
      // gửi email đến user nếu mở bán
      emailService.sendMailNewProduct({
        product_id: productId,
        product_name: body.product_name,
        price: body.price,
        description: body.description,
        thumbnail: body.thumbnail,
      });
    }

    return { status: 201, message: "Product created successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.searchProductService = async (q) => {
  try {
    const [products] = await pool.execute(
      `SELECT 
        p.product_id, 
        p.product_name, 
        p.thumbnail,
        p.discount, 
        p.price, 
        p.status, 
        c.category_name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      WHERE p.product_name LIKE ? OR c.category_name LIKE ?`,
      [`%${q}%`, `%${q}%`]
    );

    if (!products.length) {
      return { status: 404, message: "No products found" };
    }
    return products;
  } catch {
    return { status: 500, message: "Error searching products" };
  }
};

module.exports.updateStatusProductService = async (id, status) => {
  try {
    await pool.execute("UPDATE products SET status = ? WHERE product_id = ?", [
      status,
      id,
    ]);
    return { status: 200, message: "Product status updated successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getOneProductImportService = async (id) => {
  try {
    const [[product]] = await pool.execute(
      `SELECT 
        p.product_id, 
        p.product_name,
        p.status
      FROM products p
      WHERE p.product_id = ?`,
      [id]
    );

    if (!product) {
      return { status: 404, message: "Product not found" };
    }

    const [colorSizes] = await pool.execute(
      `
      SELECT 
        cs.color_size_id, 
        cl.color_name, 
        cl.image, 
        cl.color_id,
        s.size_name, 
        s.size_id,
        s.quantity
        FROM color_size cs
        JOIN colors cl ON cs.color_id = cl.color_id
        JOIN sizes s ON cs.size_id = s.size_id
        WHERE cs.product_id = ?
        `,
      [id]
    );

    const options = Object.values(
      colorSizes.reduce((acc, cs) => {
        if (!acc[cs.color_name]) {
          acc[cs.color_name] = {
            color_size_id: cs.color_size_id,
            color_name: cs.color_name,
            color_id: cs.color_id,
            image: cs.image,
            sizes: [],
          };
        }

        acc[cs.color_name].sizes.push({
          size_id: cs.size_id,
          size_name: cs.size_name,
          quantity: cs.quantity,
        });
        return acc;
      }, {})
    );

    const result = {
      product_id: product.product_id,
      product_name: product.product_name,
      status: product.status,
      options: options,
    };
    return result;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.importQuantityProductService = async (id, body) => {
  try {
    for (const size of body) {
      if (size.quantity_change && size.insert_quantity) {
        await pool.execute(`UPDATE sizes SET quantity = ? WHERE size_id = ?`, [
          size.quantity_change + size.insert_quantity,
          size.size_id,
        ]);
      } else if (size.quantity_change && !size.insert_quantity) {
        await pool.execute(`UPDATE sizes SET quantity = ? WHERE size_id = ?`, [
          size.quantity_change,
          size.size_id,
        ]);
      } else if (size.insert_quantity && !size.quantity_change) {
        await pool.execute(
          `UPDATE sizes SET quantity = quantity + ? WHERE size_id = ?`,
          [size.insert_quantity, size.size_id]
        );
      }
    }

    return { status: 200, message: "Quantity imported successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.addNewSizeService = async (id, body) => {
  try {
    const sizeId = uuidv4();
    await Promise.allSettled([
      pool.execute(
        `INSERT INTO sizes (size_id, size_name, quantity) VALUES (?, ?, ?)`,
        [sizeId, body.size_name, body.quantity]
      ),
      pool.execute(
        `INSERT INTO color_size (color_size_id, product_id, color_id, size_id) VALUES (?, ?, ?, ?)`,
        [uuidv4(), id, body.color_id, sizeId]
      ),
    ]);

    return { status: 201, message: "New size added successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deleteSizeService = async (id) => {
  try {
    const [size] = await pool.execute(
      `SELECT size_id FROM sizes WHERE size_id = ?`,
      [id]
    );

    if (!size) {
      return { status: 404, message: "Size not found" };
    }

    await pool.execute(`DELETE FROM sizes WHERE size_id = ?`, [id]);
    return { status: 200, message: "Size deleted successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
