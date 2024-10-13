import mongoose from "mongoose";

const thyroidUltrasoundSchema = new mongoose.Schema(
  {
    serviceOrderedId: {
      type: String,
      required: true,
    },
    reportCode: {
      type: String,
      default: null,
      trim: true,
    },
    treatmentDay: {
      type: Number,
      default: null,
      trim: true,
    },
    doctorName: {
      type: String,
      required: true,
      default: null,
      trim: true,
    },
    diagostic: {
      type: String,
      default: null,
      trim: true,
    },
    patientName: {
      type: String,
      required: true,
      default: null,
      trim: true,
    },
    ages: {
      type: String,
      default: null,
      trim: true,
    },
    rightLobe: {
      type: String,
      default: null,
      trim: true,
    },
    leftLobe: {
      type: String,
      default: null,
      trim: true,
    },
    finalConclusion: {
      type: String,
      default: null,
    },
    imageOne: {
      type: String,
      default: null,
    },
    imageTwo: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const ThyroidUltrasound = mongoose.model(
  "ThyroidUltrasound",
  thyroidUltrasoundSchema
);