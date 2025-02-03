import mongoose, { Schema, Document } from "mongoose";

export interface IImageGallery extends Document {
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ImageGallerySchema: Schema = new Schema<IImageGallery>(
  {
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const ImageGallery = mongoose.model<IImageGallery>(
  "ImageGallery",
  ImageGallerySchema
);
