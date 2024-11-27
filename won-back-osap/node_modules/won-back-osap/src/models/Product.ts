import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  productId: string;
  productName: string;
  category: string;
  price: number;
}

const productSchema = new Schema<IProduct>(
  {
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
