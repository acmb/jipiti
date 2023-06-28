import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    picture: {
        required: false,
        type: String
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export default mongoose.model('User', userSchema);
