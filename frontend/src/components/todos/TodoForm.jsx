import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatDateForInput } from '../../utils/dateHelpers';

const TodoForm = ({ onSubmit, editTodo, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTodo) {
      setFormData({
        title: editTodo.title,
        description: editTodo.description || '',
        dueDate: formatDateForInput(editTodo.dueDate)
      });
    }
  }, [editTodo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.dueDate) {
      setError('Title and due date are required');
      return;
    }

    onSubmit(formData);

    // Reset form if not editing
    if (!editTodo) {
      setFormData({
        title: '',
        description: '',
        dueDate: ''
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: ''
    });
    setError('');
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 transition-colors duration-200">
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {editTodo ? 'Edit Todo' : 'Create New Todo'}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter todo title"
          required
        />

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter todo description (optional)"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <Input
          label="Due Date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <div className="flex gap-2">
          <Button type="submit" variant="primary">
            {editTodo ? 'Update Todo' : 'Create Todo'}
          </Button>
          {editTodo && (
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
