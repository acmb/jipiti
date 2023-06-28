import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    text: {
        required: true,
        type: String
    },
    source: {
        required: true,
        type: String
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export default mongoose.model('Message', messageSchema);
