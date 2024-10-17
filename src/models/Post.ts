import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    short_desc: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    position: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    view: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,  // Tinyint can be stored as Number
        default: 1,    // 1: Inactive, 2: Active, 0: Deleted
        enum: [0, 1, 2],
        required: true
    },
    created_by: {
        type: String,
        required: true,
    },
    updated_by: {
        type: String,
        default: null,
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

const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};


// Pre-save hook to generate the slug from the title
postSchema.pre('save', async function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
        const randomString = generateRandomString(6);
        this.slug += `-${randomString}`;
    }
    next();
});

// Creating a model from the schema
export const Post = mongoose.model('Post', postSchema);