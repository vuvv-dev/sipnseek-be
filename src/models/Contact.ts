import mongoose, { Schema } from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailOrPhone: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        default: 0, // 0 khác, 1 nam, 2 nữ
        enum: [0, 1, 2],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    status: {
        type: Number,  // Tinyint can be stored as Number
        default: 1,    // 1: in-proccess, 2: proccessed, 0: Deleted
        enum: [0, 1, 2],
        required: true
    },
    updated_by: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});



// Creating a model from the schema
export const Contact = mongoose.model('Contact', contactSchema);