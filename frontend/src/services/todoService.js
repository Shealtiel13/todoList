import api from './api';

const todoService = {
  // Get all todos
  getTodos: async () => {
    try {
      const response = await api.get('/todos');
      return response.data.todos;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch todos';
    }
  },

  // Get single todo
  getTodoById: async (id) => {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data.todo;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch todo';
    }
  },

  // Create new todo
  createTodo: async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      return response.data.todo;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create todo';
    }
  },

  // Update todo
  updateTodo: async (id, todoData) => {
    try {
      const response = await api.put(`/todos/${id}`, todoData);
      return response.data.todo;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update todo';
    }
  },

  // Toggle todo status
  toggleTodoStatus: async (id) => {
    try {
      const response = await api.patch(`/todos/${id}/status`);
      return response.data.todo;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to toggle todo status';
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete todo';
    }
  }
};

export default todoService;
