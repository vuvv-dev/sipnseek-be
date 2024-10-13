import mongoose from "mongoose";

const echocardiographySchema = new mongoose.Schema(
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
    imageOne: {
      type: String,
      default: null,
    },
    imageTwo: {
      type: String,
      default: null,
    },
    finalConclusion: {
      type: String,
      default: null,
    },
    twoDTM: {
      LA: {
        type: String,
        default: null,
      },
      IVSd: {
        type: String,
        default: null,
      },
      IVSs: {
        type: String,
        default: null,
      },
      Ao: {
        type: String,
        default: null,
      },
      LVDd: {
        type: String,
        default: null,
      },
      LVDs: {
        type: String,
        default: null,
      },
      RV: {
        type: String,
        default: null,
      },
      PWd: {
        type: String,
        default: null,
      },
      PWs: {
        type: String,
        default: null,
      },
      EF: {
        type: String,
        default: null,
      },
      FS: {
        type: String,
        default: null,
      },
    },
    aorticValve: {
      AoVmax: {
        type: String,
        default: null,
      },
      AoVmean: {
        type: String,
        default: null,
      },
      AoPGMax: {
        type: String,
        default: null,
      },
      AoPGmean: {
        type: String,
        default: null,
      },
    },
    pulmonaryValve : {
        PaVmax: {
            type: String,
            default: null,
        },
        PaVmin: {
            type: String,
            default: null,
        },
        PaPGmax: {
            type: String,
            default: null,
        }, 
        PaPGmin: {
            type: String,
            default: null,
        }
    },
    mitralValve: {
        MVVmax: {
            type: String,
            default: null,
        }, 
        MVVmean: {
            type: String,
            default: null,
        }, 
        MVPGmax: {
            type: String,
            default: null,
        }, 
        MVPGmean: {
            type: String,
            default: null,
        }
    }, 
    tricuspidValve: {
        TVVmax: {
            type: String,
            default: null,
        }, 
        PAPS: {
            type: String,
            default: null,
        }
    }
  },
  {
    timestamps: true,
  }
);

export const Echocardiography = mongoose.model(
  "Echocardiography",
  echocardiographySchema
);