import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: String,
    body: String,
    listItems: [String],
    type: { type: String, enum: ['text', 'list'] },
    shared: Boolean,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Task = mongoose.model('Task', TaskSchema);
