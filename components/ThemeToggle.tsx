
import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-brand-text dark:text-brand-dark-text bg-gray-200 dark:bg-brand-dark-surface hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <i className="fas fa-moon text-xl"></i>
      ) : (
        <i className="fas fa-sun text-xl"></i>
      )}
    </button>
  );
};
