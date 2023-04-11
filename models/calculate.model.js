const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
});

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

const Subtask = mongoose.model('Subtask', subtaskSchema);
const Task = mongoose.model('Task', taskSchema);
const Board = mongoose.model('Board', boardSchema);

module.exports = {
  Subtask,
  Task,
  Board,
};
