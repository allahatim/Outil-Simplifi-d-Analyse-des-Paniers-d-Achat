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
const Sale_1 = require("../src/models/Sale");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../src/database"));
dotenv_1.default.config();
const BATCH_SIZE = 1000;
const importSales = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        console.log('Connected to the database');
        const batch = [];
        let rowCount = 0;
        const stream = fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => {
            batch.push({
                saleId: row.SaleID,
                productId: row.ProductID,
                quantity: Number(row.Quantity),
                date: new Date(row.Date),
                totalAmount: Number(row.TotalAmount),
            });
            rowCount++;
            if (batch.length >= BATCH_SIZE) {
                stream.pause();
                processBatch(batch)
                    .then(() => {
                    console.log(`Processed ${rowCount} rows so far.`);
                    stream.resume();
                })
                    .catch((err) => {
                    console.error('Error processing batch:', err);
                    stream.resume();
                });
            }
        })
            .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            if (batch.length > 0) {
                yield processBatch(batch);
            }
            console.log(`Sale import process completed. Total rows processed: ${rowCount}`);
        }))
            .on('error', (err) => {
            console.error('Error reading CSV file:', err);
        });
    }
    catch (error) {
        console.error('Error importing sales:', error);
    }
});
const processBatch = (batch) => __awaiter(void 0, void 0, void 0, function* () {
    const bulkOps = batch.map((sale) => ({
        updateOne: {
            filter: { saleId: sale.saleId },
            update: {
                $set: {
                    productId: sale.productId,
                    quantity: sale.quantity,
                    date: sale.date,
                    totalAmount: sale.totalAmount,
                },
            },
            upsert: true,
        },
    }));
    try {
        yield Sale_1.Sale.bulkWrite(bulkOps, { ordered: false });
        console.log(`Successfully processed batch of ${batch.length} rows.`);
    }
    catch (error) {
        console.error('Error during bulk write operation:', error);
    }
    finally {
        batch.length = 0;
    }
});
const filePath = path_1.default.resolve(__dirname, '../data/sales.csv');
importSales(filePath);
