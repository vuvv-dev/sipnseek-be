import mongoose, { Schema, Document } from "mongoose";

export interface IPurpose extends Document {
  value: string;
  label: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PurposeSchema: Schema = new Schema<IPurpose>(
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

export const Purpose = mongoose.model<IPurpose>("Purpose", PurposeSchema);