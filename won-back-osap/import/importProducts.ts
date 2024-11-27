import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { Product } from '../src/models/Product';
import dotenv from 'dotenv';
import connectDB from '../src/database';

dotenv.config();

const importProducts = async (filePath: string) => {
  try {
    await connectDB();

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', async (row) => {
        const existingProduct = await Product.findOne({ productId: row.ProductID }).exec();

        if (existingProduct) {
          existingProduct.productName = row.ProductName;
          existingProduct.category = row.Category;
          existingProduct.price = Number(row.Price);
          await existingProduct.save();
          console.log(`Updated product: ${row.ProductID}`);
        } else {
          const newProduct = new Product({
            productId: row.ProductID,
            productName: row.ProductName,
            category: row.Category,
            price: Number(row.Price),
          });
          await newProduct.save();
          console.log(`Inserted new product: ${row.ProductID}`);
        }
      })
      .on('end', () => {
        console.log('Product import process completed.');
      });
  } catch (error) {
    console.error('Error importing products:', error);
  }
};

const filePath = path.resolve(__dirname, '../data/products.csv');
importProducts(filePath);
