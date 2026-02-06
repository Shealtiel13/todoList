const asyncHandler = require('express-async-handler');
const Todo = require('../models/Todo');

// @desc    Get all todos for user
// @route   GET /api/todos
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: todos.length,
    todos
  });
});

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  // Check ownership
  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this todo');
  }

  res.json({
    success: true,
    todo
  });
});

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;

  // Validation
  if (!title || !dueDate) {
    res.status(400);
    throw new Error('Title and due date are required');
  }

  const todo = await Todo.create({
    user: req.user._id,
    title,
    description,
    dueDate
  });

  res.status(201).json({
    success: true,
    todo
  });
});

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  // Check ownership
  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this todo');
  }

  const { title, description, dueDate, status } = req.body;

  // Update fields
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (dueDate !== undefined) todo.dueDate = dueDate;
  if (status !== undefined) todo.status = status;

  const updatedTodo = await todo.save();

  res.json({
    success: true,
    todo: updatedTodo
  });
});

// @desc    Toggle todo status
// @route   PATCH /api/todos/:id/status
// @access  Private
const toggleTodoStatus = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  // Check ownership
  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this todo');
  }

  // Toggle status
  todo.status = todo.status === 'complete' ? 'incomplete' : 'complete';

  // Set completedAt timestamp
  if (todo.status === 'complete') {
    todo.completedAt = new Date();
  } else {
    todo.completedAt = null;
  }

  await todo.save();

  res.json({
    success: true,
    todo
  });
});

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  // Check ownership
  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this todo');
  }

  await todo.deleteOne();

  res.json({
    success: true,
    message: 'Todo deleted successfully'
  });
});

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo
};
