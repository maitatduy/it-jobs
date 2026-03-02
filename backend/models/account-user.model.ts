import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const schema = new Schema(
    {
        fullName: String,
        email: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

const AccountUser = mongoose.model('AccountUser', schema, 'account-user');

export default AccountUser;
