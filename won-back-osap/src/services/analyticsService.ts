import { Product } from "../models/Product";
import { Sale } from "../models/Sale";

const getDateRange = (period: '7_days' | '30_days' | '12_months'): { startDate: Date; endDate: Date } => {
  const endDate = new Date();
  let startDate = new Date();

  switch (period) {
    case '7_days':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30_days':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '12_months':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
  }

  return { startDate, endDate };
};

export const getTotalSalesForPeriod = async (period: '7_days' | '30_days' | '12_months'): Promise<number> => {
  const { startDate, endDate } = getDateRange(period);

  const sales = await Sale.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$totalAmount", "$quantity"] } },
      },
    },
  ]);

  return sales[0]?.total || 0;
};

export const getTopSellingProducts = async (period: '7_days' | '30_days' | '12_months'): Promise<any[]> => {
  const { startDate, endDate } = getDateRange(period);

  const topProducts = await Sale.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$productId",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "products", 
        localField: "_id",
        foreignField: "productId", 
        as: "product",
      },
    },
    { $unwind: "$product" },
  ]);

  return topProducts.map((item) => ({
    productName: item.product.productName,
    totalQuantity: item.totalQuantity,
  }));
};

export const getSalesByCategory = async (period: '7_days' | '30_days' | '12_months'): Promise<any[]> => {
  const { startDate, endDate } = getDateRange(period);

  const categorySales = await Sale.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $lookup: {
        from: "products", 
        localField: "productId",
        foreignField: "productId",
        as: "product",
      },
    },
    { 
      $unwind: "$product" 
    },
    {
      $group: {
        _id: "$product.category", 
        totalSales: { 
          $sum: { 
            $multiply: ["$product.price", "$quantity"] 
          } 
        },
      },
    },
    {
      $project: {
        category: "$_id",
        totalSales: 1,
        _id: 0,
      },
    },
  ]);

  const totalSales = categorySales.reduce((sum, item) => sum + item.totalSales, 0);

  if (totalSales === 0) {
    return categorySales.map((item) => ({
      category: item.category,
      percentage: "0%",
    }));
  }
  return categorySales.map((item) => ({
    category: item.category,
    percentage: ((item.totalSales / totalSales) * 100).toFixed(2) + "%",
  }));
};

export const getProductsWithDetails = async (period: '7_days' | '30_days' | '12_months'): Promise<any[]> => {
  const { startDate, endDate } = getDateRange(period);

  const products = await Product.aggregate([
    {
      $lookup: {
        from: "sales",
        localField: "productId", 
        foreignField: "productId",
        as: "sales",
      },
    },
    {
      $unwind: {
        path: "$sales",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        "sales.date": { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$productId",
        productName: { $first: "$productName" }, 
        category: { $first: "$category" }, 
        price: { $first: "$price" },
        totalSales: { $sum: "$sales.quantity" },
      },
    },
    {
      $project: {
        _id: 0,
        productName: 1,
        category: 1,
        price: 1,
        totalSales: 1,
      },
    },
  ]);

  return products.map((product) => ({
    productName: product.productName,
    category: product.category,
    price: product.price,
    totalSales: product.totalSales || 0,
  }));
};


