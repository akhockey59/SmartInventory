"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../component/ThemeToggle";

export default function Navigation() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg shadow-lg transition-all duration-300 ${
        theme === "dark"
          ? "bg-black/60 border-b border-gray-800"
          : "bg-white/60 border-b border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between px-10 py-4 max-w-7xl mx-auto">
        {/* 🔥 Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8"
                y="8"
                width="14"
                height="14"
                stroke={theme === "dark" ? "white" : "black"}
                strokeWidth="2"
              />
              <rect
                x="12"
                y="12"
                width="14"
                height="14"
                stroke={theme === "dark" ? "white" : "black"}
                strokeWidth="2"
              />
              <circle
                cx="11"
                cy="11"
                r="1.5"
                fill={theme === "dark" ? "white" : "black"}
              />
              <circle
                cx="15"
                cy="15"
                r="1.5"
                fill={theme === "dark" ? "white" : "black"}
              />
              <circle
                cx="19"
                cy="19"
                r="1.5"
                fill={theme === "dark" ? "white" : "black"}
              />
            </svg>
          </motion.div>
          <motion.span
            whileHover={{ scale: 1.1, x: 5 }}
            className="text-xl font-extrabold tracking-wider transition-all duration-300"
          >
            SMART INVENTORY
          </motion.span>
        </Link>

        {/* 🌟 Navigation Buttons */}
        <div className="flex items-center gap-6">
          <ThemeToggle />

          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
              className={`px-4 py-2 font-medium transition-all duration-300 ${
                theme === "dark"
                  ? "text-white/90 hover:text-white"
                  : "text-black/90 hover:text-black"
              }`}
            >
              Login
            </motion.button>
          </Link>

          <Link href="/trial">
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`px-6 py-2 font-semibold rounded-full shadow-md transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800"
                  : "bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700"
              }`}
            >
              Start Free Trial
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
