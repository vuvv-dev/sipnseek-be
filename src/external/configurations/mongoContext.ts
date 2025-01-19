import mongoose from 'mongoose';
import { PriceSeeding } from './PriceSeed';
import { DistanceSeeding } from './DistanceSeed';
import { PurposeSeeding } from './PurposeSeed';

export const connectDB = async () => {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
        throw new Error('DB_URI is not defined in environment variables');
    }
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(dbUri);
        console.log('Database connected successfully!');
        //seeding data
        await PriceSeeding();
        await DistanceSeeding();
        await PurposeSeeding();
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

