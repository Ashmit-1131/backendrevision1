const express = require('express');
const router = express.Router();
const { Board, Task, Subtask } = require('../models/calculate.model');

// Get all boards
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().populate('tasks');
    res.json(boards);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get a board by ID
router.get('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate('tasks');
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }
    res.json(board);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Create a new board
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const board = new Board({ name });
    await board.save();
    res.json(board);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Update a board by ID
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }
    res.json(board);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a board by ID
router.delete('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }
    await Task.deleteMany({ _id: { $in: board.tasks } });
    await board.remove();
    res.json({ msg: 'Board deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
