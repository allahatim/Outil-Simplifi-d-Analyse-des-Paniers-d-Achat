import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { Sale } from '../src/models/Sale';
import dotenv from 'dotenv';
import connectDB from '../src/database';

dotenv.config();

const BATCH_SIZE = 1000;

const importSales = async (filePath: string) => {
  try {
    await connectDB();
    console.log('Connected to the database');

    const batch: any[] = [];
    let rowCount = 0;

    const stream = fs.createReadStream(filePath)
      .pipe(csvParser())
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
      .on('end', async () => {
        if (batch.length > 0) {
          await processBatch(batch);
        }
        console.log(`Sale import process completed. Total rows processed: ${rowCount}`);
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err);
      });
  } catch (error) {
    console.error('Error importing sales:', error);
  }
};

const processBatch = async (batch: any[]) => {
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
    await Sale.bulkWrite(bulkOps, { ordered: false });
    console.log(`Successfully processed batch of ${batch.length} rows.`);
  } catch (error) {
    console.error('Error during bulk write operation:', error);
  } finally {
    batch.length = 0;
  }
};

const filePath = path.resolve(__dirname, '../data/sales.csv');
importSales(filePath);
