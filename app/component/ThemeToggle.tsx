"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      onClick={toggleTheme}
      className={`relative transition-all duration-300 shadow-lg rounded-full 
        ${theme === "dark"
          ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-blue-500/50"
          : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-yellow-400/50"
        }
        p-2 sm:p-3 lg:p-4  // Responsive padding
      `}
    >
      {/* Outer Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-lg opacity-50 
          ${theme === "dark" ? "bg-blue-500/50" : "bg-yellow-400/50"}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Rotating Icon */}
      <motion.div
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: theme === "dark" ? 180 : 0, scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut", repeat: 1 }}
      >
        {theme === "dark" ? (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
