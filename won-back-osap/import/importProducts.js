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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const Product_1 = require("../src/models/Product");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../src/database"));
dotenv_1.default.config();
const importProducts = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => __awaiter(void 0, void 0, void 0, function* () {
            const existingProduct = yield Product_1.Product.findOne({ productId: row.ProductID }).exec();
            if (existingProduct) {
                existingProduct.productName = row.ProductName;
                existingProduct.category = row.Category;
                existingProduct.price = Number(row.Price);
                yield existingProduct.save();
                console.log(`Updated product: ${row.ProductID}`);
            }
            else {
                // Insert new product
                const newProduct = new Product_1.Product({
                    productId: row.ProductID,
                    productName: row.ProductName,
                    category: row.Category,
                    price: Number(row.Price),
                });
                yield newProduct.save();
                console.log(`Inserted new product: ${row.ProductID}`);
            }
        }))
            .on('end', () => {
            console.log('Product import process completed.');
        });
    }
    catch (error) {
        console.error('Error importing products:', error);
    }
});
const filePath = path_1.default.resolve(__dirname, '../data/products.csv');
importProducts(filePath);
