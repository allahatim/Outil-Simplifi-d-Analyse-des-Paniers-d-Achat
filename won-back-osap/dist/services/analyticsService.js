"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithDetails = exports.getSalesByCategory = exports.getTopSellingProducts = exports.getTotalSalesForPeriod = void 0;
const Product_1 = require("../models/Product");
const Sale_1 = require("../models/Sale");
const getDateRange = (period) => {
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
const getTotalSalesForPeriod = (period) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { startDate, endDate } = getDateRange(period);
    const sales = yield Sale_1.Sale.aggregate([
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
    return ((_a = sales[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
});
exports.getTotalSalesForPeriod = getTotalSalesForPeriod;
const getTopSellingProducts = (period) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = getDateRange(period);
    const topProducts = yield Sale_1.Sale.aggregate([
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
});
exports.getTopSellingProducts = getTopSellingProducts;
const getSalesByCategory = (period) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = getDateRange(period);
    const categorySales = yield Sale_1.Sale.aggregate([
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
});
exports.getSalesByCategory = getSalesByCategory;
const getProductsWithDetails = (period) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = getDateRange(period);
    const products = yield Product_1.Product.aggregate([
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
});
exports.getProductsWithDetails = getProductsWithDetails;
