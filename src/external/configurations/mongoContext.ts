import mongoose from 'mongoose';

export const connectDB = async () => {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
        throw new Error('DB_URI is not defined in environment variables');
    }
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(dbUri);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

