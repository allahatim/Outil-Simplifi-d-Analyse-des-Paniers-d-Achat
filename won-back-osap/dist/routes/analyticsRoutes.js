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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsService_1 = require("../services/analyticsService");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/sales/total/{period}:
 *   get:
 *     summary: Get total sales for a specific period
 *     parameters:
 *       - in: path
 *         name: period
 *         description: The period for sales data (e.g., 7_days, 30_days, 12_months)
 *         required: false
 *         schema:
 *           type: string
 *           default: '7_days'
 *     responses:
 *       200:
 *         description: Total sales data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *                   example: 123456
 *       500:
 *         description: Error fetching total sales
 */
router.get('/sales/total/:period?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const period = req.params.period || '7_days';
        const totalSales = yield (0, analyticsService_1.getTotalSalesForPeriod)(period);
        res.status(200).json({ totalSales });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching total sales', error });
    }
}));
/**
 * @swagger
 * /api/sales/top-products/{period}:
 *   get:
 *     summary: Get top-selling products for a specific period
 *     parameters:
 *       - in: path
 *         name: period
 *         description: The period for sales data (e.g., 7_days, 30_days, 12_months)
 *         required: false
 *         schema:
 *           type: string
 *           default: '7_days'
 *     responses:
 *       200:
 *         description: List of top-selling products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   productName:
 *                     type: string
 *       500:
 *         description: Error fetching top-selling products
 */
router.get('/sales/top-products/:period?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const period = req.params.period || '7_days';
        const topProducts = yield (0, analyticsService_1.getTopSellingProducts)(period);
        res.status(200).json({ topProducts });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching top-selling products', error });
    }
}));
/**
 * @swagger
 * /api/sales/category/{period}:
 *   get:
 *     summary: Get sales data by category for a specific period
 *     parameters:
 *       - in: path
 *         name: period
 *         description: The period for sales data (e.g., 7_days, 30_days, 12_months)
 *         required: false
 *         schema:
 *           type: string
 *           default: '7_days'
 *     responses:
 *       200:
 *         description: Sales data by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: string
 *                   example: 'Electronics'
 *                 totalSales:
 *                   type: number
 *                   example: 1000
 *       500:
 *         description: Error fetching sales by category
 */
router.get('/sales/category/:period?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const period = req.params.period || '7_days';
        const salesByCategory = yield (0, analyticsService_1.getSalesByCategory)(period);
        res.status(200).json({ salesByCategory });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching sales by category', error });
    }
}));
/**
 * @swagger
 * /api/products/details/{period}:
 *   get:
 *     summary: Get product details for a specific period
 *     parameters:
 *       - in: path
 *         name: period
 *         description: The period for sales data (e.g., 7_days, 30_days, 12_months)
 *         required: false
 *         schema:
 *           type: string
 *           default: '7_days'
 *     responses:
 *       200:
 *         description: List of product details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   productName:
 *                     type: string
 *       500:
 *         description: Error fetching product details
 */
router.get('/products/details/:period?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const period = req.params.period || '7_days';
        const products = yield (0, analyticsService_1.getProductsWithDetails)(period);
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product details', error });
    }
}));
exports.default = router;
