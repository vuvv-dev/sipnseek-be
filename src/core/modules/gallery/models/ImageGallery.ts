import mongoose, { Schema, Document } from "mongoose";

export interface IImageGallery extends Document {
  image: string;
  store: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ImageGallerySchema: Schema = new Schema<IImageGallery>(
  {
    image: { type: String, required: true },
    store: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
export const ImageGallery = mongoose.model<IImageGallery>(
  "ImageGallery",
  ImageGallerySchema
);
