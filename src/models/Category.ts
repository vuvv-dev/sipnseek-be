import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    status: {
        type: Number,  // Tinyint can be stored as Number
        default: 1, // 1: Inactive, 2: Active, 0: Deleted
        enum: [0, 1, 2],
        required: true
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    parent_id: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    position: {
        type: Number,
        default: 0,
        required: true
    },
    meta_title: {
        type: String,
        default: null
    },
    meta_description: {
        type: String,
        default: null
    },
    meta_keyword: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

export const Category = mongoose.model('Category', categorySchema);