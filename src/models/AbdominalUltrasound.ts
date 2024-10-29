import mongoose from "mongoose";

const abdominalUltrasoundSchema = new mongoose.Schema(
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
      type: String,
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
    gender: {
      type: String,
      default: null,
      trim: true,
    },
    address: {
      type: String,
      default: null,
      trim: true,
    },
    //gan
    liver: {
      type: String,
      default: null,
      trim: true,
    },
    //túi mật, đường mật
    gallbladderBiliaryTract: {
      type: String,
      default: null,
      trim: true,
    },
    //bàng quang
    bladder: {
      type: String,
      default: null,
      trim: true,
    },
    // lá lách
    milt: {
      type: String,
      default: null,
      trim: true,
    },
    //tụy
    pancreas: {
      type: String,
      default: null,
      trim: true,
    },
    //dịch tự do
    mucus: {
      type: String,
      default: null,
      trim: true,
    },
    kidney: {
      type: String,
      default: null,
      trim: true,
    },
    other: {
      type: String,
      default: null,
      trim: true,
    },
    finalConclusion: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
export const AbdominalUltrasound = mongoose.model(
  "AbdominalUltrasound",
  abdominalUltrasoundSchema
);
