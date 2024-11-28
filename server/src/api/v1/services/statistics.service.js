const pool = require("../../../config/database");

module.exports.dashboardService = async () => {
  try {
    const [
      [[currentMonthOrdersData]],
      [[previousMonthOrdersData]],
      [[currentMonthUsersData]],
      [[previousMonthUsersData]],
      [monthlyRevenueData],
    ] = await Promise.all([
      // Tổng đơn hàng và doanh thu của tháng hiện tại
      pool.query(`
        SELECT 
          COUNT(order_id) AS total_orders, 
          SUM(total) AS total_revenue
        FROM 
          orders
        WHERE 
          MONTH(created_at) = MONTH(CURRENT_DATE())
          AND YEAR(created_at) = YEAR(CURRENT_DATE());
      `),
      // Tổng đơn hàng và doanh thu của tháng trước
      pool.query(`
        SELECT 
          COUNT(order_id) AS total_orders,
          SUM(total) AS total_revenue
        FROM 
          orders
        WHERE 
          MONTH(created_at) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH)
          AND YEAR(created_at) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH);
      `),
      // Tổng số user mới đăng ký trong tháng hiện tại
      pool.query(`
        SELECT 
          COUNT(user_id) AS total_users
        FROM 
          users
        WHERE 
          MONTH(created_at) = MONTH(CURRENT_DATE())
          AND YEAR(created_at) = YEAR(CURRENT_DATE());
      `),
      // Tổng số user mới đăng ký trong tháng trước
      pool.query(`
        SELECT 
          COUNT(user_id) AS total_users
        FROM 
          users
        WHERE 
          MONTH(created_at) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH)
          AND YEAR(created_at) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH);
      `),
      pool.query(`
        WITH months AS (
          SELECT 
            DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL (a.a + (10 * b.a)) MONTH), '%Y-%m') AS month 
          FROM 
            (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
          CROSS JOIN 
            (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
          WHERE 
            DATE_SUB(CURDATE(), INTERVAL (a.a + (10 * b.a)) MONTH) >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
          ORDER BY 
            month DESC
        )
        SELECT 
          months.month, 
          COALESCE(SUM(orders.total), 0) AS total_revenue 
        FROM 
          months
        LEFT JOIN 
          orders ON DATE_FORMAT(orders.created_at, '%Y-%m') = months.month
        GROUP BY 
          months.month
        ORDER BY 
          months.month ASC;
      `),
    ]);
    //
    const currentOrders = currentMonthOrdersData.total_orders || 0;
    const currentRevenue = currentMonthOrdersData.total_revenue || 0.0;
    const previousOrders = previousMonthOrdersData.total_orders || 0;
    const previousRevenue = previousMonthOrdersData.total_revenue || 0.0;

    const currentUsers = currentMonthUsersData.total_users || 0;
    const previousUsers = previousMonthUsersData.total_users || 0;

    const revenueChangePercentage =
      previousRevenue > 0
        ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
        : currentRevenue > 0
        ? 100
        : 0;
    // so sánh đơn hàng với tháng trc
    const ordersChangePercentage =
      previousOrders > 0
        ? ((currentOrders - previousOrders) / previousOrders) * 100
        : currentOrders > 0
        ? 100
        : 0;
    // so sánh user với tháng trc
    const usersChangePercentage =
      previousUsers > 0
        ? ((currentUsers - previousUsers) / previousUsers) * 100
        : currentUsers > 0
        ? 100
        : 0;

    // Trả về dữ liệu
    return {
      status: 200,
      data: {
        order: {
          total_orders: currentOrders,
          orders_change_percentage: ordersChangePercentage,
        },
        revenue: {
          total_revenue: currentRevenue,
          revenue_change_percentage: revenueChangePercentage,
        },
        user: {
          total_users: currentUsers,
          users_change_percentage: usersChangePercentage,
        },
        monthly_revenue: monthlyRevenueData,
      },
    };
  } catch (error) {
    console.log(error.message);

    return { status: 500, message: error.message };
  }
};
