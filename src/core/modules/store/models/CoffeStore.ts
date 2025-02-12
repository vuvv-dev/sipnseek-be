import mongoose, { Schema, Document } from "mongoose";

export interface ICoffeStore extends Document {
  storename: string;
  addressName: string;
  addressGoogle: {
    latitude: number | null;
    longitude: number | null;
  };
  openTime: string;
  closeTime: string;
  thumbnail: string;
  parkinglot: string;
  avrPrice: Number;
  menu: Schema.Types.ObjectId[];
  description: string;
  priceTag: Schema.Types.ObjectId[];
  purposeTag: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  images: Schema.Types.ObjectId[];
}

const CoffeStoreSchema: Schema = new Schema<ICoffeStore>(
  {
    storename: { type: String, required: true },
    addressGoogle: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
    },
    addressName: { type: String, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    thumbnail: { type: String, required: true },
    parkinglot: { type: String, required: true },
    avrPrice: { type: Number, required: true },
    menu: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
    priceTag: [{ type: Schema.Types.ObjectId, ref: "Price" }],
    purposeTag: [{ type: Schema.Types.ObjectId, ref: "Purpose" }],
    description: { type: String, required: true },
    images: [{ type: Schema.Types.ObjectId, ref: "ImageGallery" }],
  },
  {
    timestamps: true,
  }
);

export const CoffeStore = mongoose.model<ICoffeStore>(
  "CoffeStore",
  CoffeStoreSchema
);
