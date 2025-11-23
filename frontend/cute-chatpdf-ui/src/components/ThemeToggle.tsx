import { useEffect, useState } from 'react';
import { Moon, Sun, Upload, Heart } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform border-2 border-kawaii-200"
    >
      {theme === 'light' ? (
        <Sun className="w-6 h-6 text-kawaii-400" />
      ) : (
        <Moon className="w-6 h-6 text-kawaii-200" />
      )}
    </button>
  );
};

export default ThemeToggle;