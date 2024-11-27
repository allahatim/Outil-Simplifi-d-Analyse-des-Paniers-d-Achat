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
router.get('/sales/total/:period', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { period } = req.params || '7_days';
        const totalSales = yield (0, analyticsService_1.getTotalSalesForPeriod)(period);
        res.status(200).json({ totalSales });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching total sales', error });
    }
}));
router.get('/sales/top-products/:period', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { period } = req.params || '7_days';
        const topProducts = yield (0, analyticsService_1.getTopSellingProducts)(period);
        res.status(200).json({ topProducts });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching top-selling products', error });
    }
}));
router.get('/sales/category/:period', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { period } = req.params || '7_days';
        const salesByCategory = yield (0, analyticsService_1.getSalesByCategory)(period);
        res.status(200).json({ salesByCategory });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching sales by category', error });
    }
}));
router.get('/products/details', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, analyticsService_1.getProductsWithDetails)();
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product details', error });
    }
}));
exports.default = router;
