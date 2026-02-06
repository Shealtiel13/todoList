import React, { useState } from 'react';
import TodoStatusLabel from './TodoStatusLabel';
import { formatDate } from '../../utils/dateHelpers';
import Button from '../common/Button';

const TodoItem = ({ todo, onToggleStatus, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    await onToggleStatus(todo._id);
    setIsToggling(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsDeleting(true);
      await onDelete(todo._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`text-xl font-semibold ${
                todo.status === 'complete'
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : 'text-gray-800 dark:text-white'
              }`}
            >
              {todo.title}
            </h3>
            <TodoStatusLabel todo={todo} />
          </div>

          {todo.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-3">{todo.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Due: {formatDate(todo.dueDate)}
            </span>
            {todo.completedAt && (
              <span className="flex items-center text-green-600 dark:text-green-400">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Completed: {formatDate(todo.completedAt)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            onClick={handleToggle}
            disabled={isToggling}
            variant={todo.status === 'complete' ? 'secondary' : 'success'}
            className="whitespace-nowrap"
          >
            {isToggling
              ? 'Updating...'
              : todo.status === 'complete'
              ? 'Mark Incomplete'
              : 'Mark Complete'}
          </Button>

          <Button
            onClick={() => onEdit(todo)}
            variant="primary"
          >
            Edit
          </Button>

          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="danger"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
