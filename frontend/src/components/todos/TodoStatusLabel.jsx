import React from 'react';
import { getTodoStatusLabel, getStatusLabelClass } from '../../utils/todoHelpers';

const TodoStatusLabel = ({ todo }) => {
  const label = getTodoStatusLabel(todo);

  if (!label) return null;

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-semibold border
        ${getStatusLabelClass(label)}
      `}
    >
      {label.toUpperCase()}
    </span>
  );
};

export default TodoStatusLabel;
