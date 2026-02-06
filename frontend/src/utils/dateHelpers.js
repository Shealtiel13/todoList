/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  return d.toLocaleDateString('en-US', options);
};

/**
 * Format date for input field (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string for input
 */
export const formatDateForInput = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Check if a date is overdue (past current date)
 * @param {string|Date} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isOverdue = (date) => {
  if (!date) return false;

  const dueDate = new Date(date);
  const now = new Date();

  // Set time to start of day for fair comparison
  dueDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return now > dueDate;
};
