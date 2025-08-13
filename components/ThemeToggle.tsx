
import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 bg-gray-200 dark:bg-brand-dark-surface rounded-full p-1 shadow-amberSm" role="group" aria-label="Alternar tema">
      <button
        onClick={() => setTheme('light')}
        className={`px-3 py-1 rounded-full transition-colors focus-ring ${theme === 'light' ? 'bg-white text-gray-900 shadow-amberSm' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-300/60'} `}
        aria-pressed={theme === 'light'}
      >
        Claro
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`px-3 py-1 rounded-full transition-colors focus-ring ${theme === 'dark' ? 'bg-gray-800 text-white shadow-amberMd' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-300/60'} `}
        aria-pressed={theme === 'dark'}
      >
        Escuro
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`px-3 py-1 rounded-full transition-colors focus-ring ${theme === 'system' ? 'bg-primary/10 text-gray-900 dark:text-white shadow-amberSm' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-300/60'} `}
        aria-pressed={theme === 'system'}
      >
        Sistema
      </button>
    </div>
  );
};
