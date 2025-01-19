import mongoose, { Schema, Document } from "mongoose";

export interface ICoffeStore extends Document {
  storename: string;
  addressName: string;
  addressGoogle: {
    latitude: number;
    longitude: number;
  };
  openTime: Date;
  closeTime: Date;
  thumnail: string;
  parkinglot: string;
  avrPrice: Number;
  menu: string;
  description: string;
  priceTag: Schema.Types.ObjectId[];
  purposeTag: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CoffeStoreSchema: Schema = new Schema<ICoffeStore>(
  {
    storename: { type: String, required: true },
    addressGoogle: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    addressName: { type: String, required: true },
    openTime: { type: Date, required: true },
    closeTime: { type: Date, required: true },
    thumnail: { type: String, required: true },
    parkinglot: { type: String, required: true },
    avrPrice: { type: Number, required: true },
    menu: { type: String, required: true },
    priceTag: [{ type: Schema.Types.ObjectId, ref: "Price" }],
    purposeTag: [{ type: Schema.Types.ObjectId, ref: "Purpose" }],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CoffeStore = mongoose.model<ICoffeStore>(
  "CoffeStore",
  CoffeStoreSchema
);
