'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../component/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { theme } = useTheme();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('userName');
      setIsLoggedIn(!!token);
      setUserName(name || 'User');
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 p-4 md:p-6 ${
        theme === 'dark' 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-white/80 backdrop-blur-md border-b border-black/10'
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <span className="text-xl font-bold tracking-wider">SMART INVENTORY</span>
          </motion.div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                {userName[0]?.toUpperCase()}
              </div>
              <span className="text-sm font-medium">{userName}</span>
              <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 border border-current rounded-lg">
                  Login
                </motion.button>
              </Link>
              <Link href="/trial">
                <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Start a Free Trial
                </motion.button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <span className="text-sm font-medium">{userName}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 border border-current rounded-lg">
                  Login
                </motion.button>
              </Link>
              <Link href="/trial">
                <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Start a Free Trial
                </motion.button>
              </Link>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
