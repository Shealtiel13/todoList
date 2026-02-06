import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow-lg transition-colors duration-200">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to TodoApp
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Manage your tasks efficiently with success and failure tracking
        </p>

        <div className="flex flex-col items-center space-y-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" className="px-8 py-3 text-lg">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <div className="flex gap-4">
                <Link to="/register">
                  <Button variant="primary" className="px-8 py-3 text-lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" className="px-8 py-3 text-lg">
                    Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg transition-colors duration-200">
            <div className="text-blue-600 dark:text-blue-400 text-3xl mb-2">✓</div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Track Tasks</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage your todos with due dates
            </p>
          </div>
          <div className="p-6 bg-green-50 dark:bg-green-900/30 rounded-lg transition-colors duration-200">
            <div className="text-green-600 dark:text-green-400 text-3xl mb-2">★</div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Success Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get rewarded when you complete tasks on time
            </p>
          </div>
          <div className="p-6 bg-red-50 dark:bg-red-900/30 rounded-lg transition-colors duration-200">
            <div className="text-red-600 dark:text-red-400 text-3xl mb-2">!</div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Failure Alerts</h3>
            <p className="text-gray-600 dark:text-gray-300">
              See which tasks missed their deadline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
