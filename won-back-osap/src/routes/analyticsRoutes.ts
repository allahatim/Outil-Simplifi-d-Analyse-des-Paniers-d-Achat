import express from 'express';
import {
  getTotalSalesForPeriod,
  getTopSellingProducts,
  getSalesByCategory,
  getProductsWithDetails,
} from '../services/analyticsService';

const router = express.Router();

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
router.get('/sales/total/:period?', async (req, res) => {
  try {
    const period = req.params.period || '7_days';
    const totalSales = await getTotalSalesForPeriod(period as '7_days' | '30_days' | '12_months');
    res.status(200).json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total sales', error });
  }
});

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
router.get('/sales/top-products/:period?', async (req, res) => {
  try {
    const period = req.params.period || '7_days';
    const topProducts = await getTopSellingProducts(period as '7_days' | '30_days' | '12_months');
    res.status(200).json({ topProducts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top-selling products', error });
  }
});

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
router.get('/sales/category/:period?', async (req, res) => {
  try {
    const period = req.params.period || '7_days';
    const salesByCategory = await getSalesByCategory(period as '7_days' | '30_days' | '12_months');
    res.status(200).json({ salesByCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales by category', error });
  }
});

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
router.get('/products/details/:period?', async (req, res) => {
  try {
    const period = req.params.period || '7_days';
    const products = await getProductsWithDetails(period as '7_days' | '30_days' | '12_months');
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error });
  }
});

export default router;
