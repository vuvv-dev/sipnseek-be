import mongoose, { Schema, Document } from "mongoose";

export interface IMenu extends Document {
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuSchema: Schema = new Schema<IMenu>(
  {
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const Menu = mongoose.model<IMenu>("Menu", MenuSchema);
