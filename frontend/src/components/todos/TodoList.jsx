import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import Loader from '../common/Loader';
import todoService from '../../services/todoService';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editTodo) {
        // Update existing todo
        const updatedTodo = await todoService.updateTodo(editTodo._id, formData);
        setTodos(todos.map((todo) => (todo._id === editTodo._id ? updatedTodo : todo)));
        setEditTodo(null);
      } else {
        // Create new todo
        const newTodo = await todoService.createTodo(formData);
        setTodos([newTodo, ...todos]);
      }
      setError('');
    } catch (err) {
      setError(err);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const updatedTodo = await todoService.toggleTodoStatus(id);
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setError('');
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError('');
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        My Todos
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      )}

      <TodoForm
        onSubmit={handleCreateOrUpdate}
        editTodo={editTodo}
        onCancelEdit={handleCancelEdit}
      />

      {todos.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No todos</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new todo above.
          </p>
        </div>
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
