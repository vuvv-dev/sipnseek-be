import mongoose from "mongoose";

const electrocardiogramSchema = new mongoose.Schema(
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
    sampleTransfer: {
        type: String,
        default: null,
        trim: true,
    },
    heartRate: {
        type: String,
        default: null,
        trim: true,
    },
    frequency: {
        type: Number,
        default: null,
    },
    heartPosition: {
        type: String,
        default: null,
    },
    axis: {
        type: String,
        default: null,
    },
    corner: {
        type: String,
        default: null,
    },
    waveP: {
        type: String,
        default: null,
    },
    intervalPR: {
        type: String,
        default: null,
    },
    qrs: {
        type: String,
        default: null,
    },
    ST: {
        type: String,
        default: null,
    }, 
    waveT: {
        type: String,
        default: null,
    }, 
    intervalQT: {
        type: String,
        default: null,
    },
    precordialLeads: {
        type: String,
        default: null,
    },
    finalConclusion: {
        type: String,
        default: null,
    }
  },
  {
    timestamps: true,
  }
);
export const Electrocardiogram = mongoose.model(
  "Electrocardiogram",
  electrocardiogramSchema
)