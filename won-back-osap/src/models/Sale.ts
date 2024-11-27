import mongoose, { Schema, Document } from 'mongoose';
interface ISale extends Document {
  saleId: string;
  productId: string;
  quantity: number;
  date: Date;
  totalAmount: number;
}

const saleSchema = new Schema<ISale>(
  {
    saleId: { type: String, required: true, unique: true },
    productId: { 
      type: String, 
      required: true, 
      ref: 'Product',
    },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
  }
);

export const Sale = mongoose.model<ISale>('Sale', saleSchema);
