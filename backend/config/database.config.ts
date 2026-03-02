import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log('Kết nối database thành công!');
    } catch (error) {
        console.error('Kết nối database thất bại. Lỗi: ', error);
        process.exit(1);
    }
};
