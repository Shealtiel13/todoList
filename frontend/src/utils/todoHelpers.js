/**
 * Determines the status label for a todo (Success/Failed)
 * @param {Object} todo - Todo object with status, dueDate, completedAt
 * @returns {string|null} - 'success', 'failed', or null
 */
export const getTodoStatusLabel = (todo) => {
  const { status, dueDate, completedAt } = todo;
  const now = new Date();
  const due = new Date(dueDate);

  // Set time to start of day for fair comparison
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  // Failed: Incomplete and past due date
  if (status === 'incomplete' && now >= due) {
    return 'failed';
  }

  // Success: Complete and finished on or before due date
  if (status === 'complete' && completedAt) {
    const completed = new Date(completedAt);
    completed.setHours(0, 0, 0, 0);

    if (completed <= due) {
      return 'success';
    }
  }

  return null;
};

/**
 * Gets the appropriate CSS classes for status label
 * @param {string} label - Status label ('success' or 'failed')
 * @returns {string} Tailwind CSS classes
 */
export const getStatusLabelClass = (label) => {
  if (label === 'success') {
    return 'bg-green-100 text-green-800 border-green-300';
  }
  if (label === 'failed') {
    return 'bg-red-100 text-red-800 border-red-300';
  }
  return '';
};
