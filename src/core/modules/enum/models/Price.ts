import mongoose, { Schema, Document } from "mongoose";

export interface IPrice extends Document {
  value: string;
  label: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PriceSchema: Schema = new Schema<IPrice>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const Price = mongoose.model<IPrice>("Price", PriceSchema);