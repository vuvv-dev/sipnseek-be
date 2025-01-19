import mongoose, { Schema, Document } from "mongoose";

export interface IDistance extends Document {
  value: string;
  label: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DistanceSchema: Schema = new Schema<IDistance>(
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

export const Distance = mongoose.model<IDistance>("Distance", DistanceSchema);