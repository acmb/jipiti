import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    source: {
        required: false,
        type: String
    },
    target: {
        required: false,
        type: String
    },
    request: {
        required: false,
        type: Object
    },
    response: {
        required: false,
        type: Object
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export default mongoose.model('Log', logSchema);
