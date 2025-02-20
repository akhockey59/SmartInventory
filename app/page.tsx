'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ThemeToggle from './component/ThemeToggle';
import { useTheme } from './context/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { theme } = useTheme();
  const router = useRouter();

  const navItems = {
    features: [
      {
        title: "Stock Tracking",
        icon: "📊"
      },
      {
        title: "QR-Access",
        icon: "🔐"
      },
      {
        title: "Automated alerts",
        icon: "🔔"
      },
      {
        title: "Product-Management",
        icon: "📦"
      },
      {
        title: "Mobile-Friendly Dashboard",
        icon: "📱"
      },
      {
        title: "Multi-Store Support",
        icon: "🏪"
      }
    ],
    solutions: [
      {
        title: "For Small Retailers",
        icon: "🏬"
      },
      {
        title: "For Wholesalers",
        icon: "📦"
      },
      {
        title: "For Mobile Users",
        icon: "📱"
      },
      {
        title: "For Warehouse Owners",
        icon: "🏭"
      },
      {
        title: "For Multi-Branch Stores",
        icon: "🌐"
      }
    ],
    learn: [
      {
        title: "How to Use the System",
        icon: "📚"
      },
      {
        title: "Setting Up QR Codes",
        icon: "🔧"
      },
      {
        title: "Managing Products & Stock",
        icon: "📋"
      },
      {
        title: "Enabling Low-Stock Alerts",
        icon: "⚡"
      },
      {
        title: "Accessing Inventory from Mobile",
        icon: "📱"
      },
      {
        title: "Integration with POS Systems",
        icon: "🔄"
      }
    ]
  };

  const services = [
    {
      title: "QR INVENTORY",
      description: "World's most advanced QR-based inventory tracking system",
      image: "/qrimage.webp",
      link: "/qr-inventory"
    },
    {
      title: "REAL-TIME ANALYTICS",
      description: "Live monitoring and predictive analysis for your stock",
      image: "/realtime.webp",
      link: "/analytics"
    },
    {
      title: "SMART AUTOMATION",
      description: "Automated inventory management with AI-powered insights",
      image: "/automations.webp",
      link: "/automation"
    }
  ];

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <main className={`relative min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Navigation Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          theme === 'dark' 
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
            : 'bg-white/80 backdrop-blur-md border-b border-black/10'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="14" height="14" stroke={theme === 'dark' ? 'white' : 'black'} strokeWidth="2"/>
                <rect x="12" y="12" width="14" height="14" stroke={theme === 'dark' ? 'white' : 'black'} strokeWidth="2"/>
                <circle cx="11" cy="11" r="1.5" fill={theme === 'dark' ? 'white' : 'black'}/>
                <circle cx="15" cy="15" r="1.5" fill={theme === 'dark' ? 'white' : 'black'}/>
                <circle cx="19" cy="19" r="1.5" fill={theme === 'dark' ? 'white' : 'black'}/>
              </svg>
            </motion.div>
            <span className="text-xl font-bold tracking-wider">SMART INVENTORY</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Features Dropdown */}
            <div className="group relative">
              <motion.button 
                className={`flex items-center gap-1 ${
                  theme === 'dark' 
                    ? 'hover:text-gray-300' 
                    : 'hover:text-gray-700'
                } py-2`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Features
                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              <motion.div 
                className="absolute top-full left-0 mt-2 w-[280px] invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`${
                  theme === 'dark'
                    ? 'bg-black/90 backdrop-blur-md border border-white/10'
                    : 'bg-white/90 backdrop-blur-md border border-black/10'
                } rounded-lg shadow-xl p-2`}>
                  {navItems.features.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        href={`/features/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center gap-3 p-3 rounded-lg ${
    theme === 'dark' 
      ? 'text-white/90 hover:text-white' 
      : 'text-black/90 hover:text-black'
  }"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Solutions Dropdown */}
            <div className="group relative">
              <motion.button 
                className={`flex items-center gap-1 ${
                  theme === 'dark' 
                    ? 'hover:text-gray-300' 
                    : 'hover:text-gray-700'
                } py-2`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Solutions
                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              <motion.div 
                className="absolute top-full left-0 mt-2 w-[280px] invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`${
                  theme === 'dark'
                    ? 'bg-black/90 backdrop-blur-md border border-white/10'
                    : 'bg-white/90 backdrop-blur-md border border-black/10'
                } rounded-lg shadow-xl p-2`}>
                  {navItems.solutions.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        href={`/solutions/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center gap-3 p-3 rounded-lg ${
    theme === 'dark' 
      ? 'text-white/90 hover:text-white' 
      : 'text-black/90 hover:text-black'
  }"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <Link href="/enterprise" className="hover:text-gray-300">
              <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                Enterprise
              </motion.span>
            </Link>
            
            <Link href="/pricing" className="hover:text-gray-300">
              <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                Pricing
              </motion.span>
            </Link>

            {/* Learn Dropdown */}
            <div className="group relative">
              <motion.button 
                className={`flex items-center gap-1 ${
                  theme === 'dark' 
                    ? 'hover:text-gray-300' 
                    : 'hover:text-gray-700'
                } py-2`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Learn
                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              <motion.div 
                className="absolute top-full left-0 mt-2 w-[280px] invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`${
                  theme === 'dark'
                    ? 'bg-black/90 backdrop-blur-md border border-white/10'
                    : 'bg-white/90 backdrop-blur-md border border-black/10'
                } rounded-lg shadow-xl p-2`}>
                  {navItems.learn.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        href={`/learn/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center gap-3 p-3 rounded-lg ${
    theme === 'dark' 
      ? 'text-white/90 hover:text-white' 
      : 'text-black/90 hover:text-black'
  }"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className={`${
                      theme === 'dark'
                        ? 'text-white/90 hover:text-white'
                        : 'text-black/90 hover:text-black'
                    }`}>
                      {userName}
                    </span>
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleLogout}
                  className={`px-6 py-2 rounded-full ${
                    theme === 'dark'
                      ? 'bg-red-700 text-white hover:bg-red-800'
                      : 'bg-red-700 text-white hover:bg-red-800'
                  }`}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className={`px-4 py-2 ${
                      theme === 'dark'
                        ? 'text-white/90 hover:text-white'
                        : 'text-black/90 hover:text-black'
                    }`}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/trial">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`px-6 py-2 rounded-full ${
                      theme === 'dark'
                        ? 'bg-red-700 text-white hover:bg-green-700'
                        : 'bg-red-700 text-white hover:bg-green-800'
                    }`}
                  >
                    Start a Free Trial
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen"
      >
        <div className="absolute inset-0">
          <Image
            src="/inventory.avif"
            alt="Modern Warehouse"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Main Content */}
        <div className="relative h-full flex flex-col justify-center items-start px-16">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            className="text-[120px] font-bold leading-none tracking-wider"
          >
            SMART
            <br />
            INVENTORY
          </motion.h1>
        </div>
      </motion.div>

      {/* Services Sections */}
      {services.map((service, index) => (
        <motion.section
          key={service.title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="relative h-screen"
        >
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black/40" 
            />
          </div>

          <div className="relative h-full flex flex-col justify-center px-16">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: "easeOut"
              }}
            >
              <motion.h2 
                className="text-[80px] font-bold leading-none tracking-wider mb-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {service.title}
              </motion.h2>
              <motion.p 
                className="text-2xl text-gray-300 max-w-2xl mb-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {service.description}
              </motion.p>
              <Link href={service.link}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="inline-flex items-center gap-2 text-xl group"
                >
                  <span>Discover more</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 transform transition-transform group-hover:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      ))}

      {/* Full Screen Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-gray-800/95 z-40"
          >
            <div className="h-full flex flex-col justify-center items-start p-16">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-6xl space-y-8"
              >
                <motion.h2 
                  className="text-[80px] font-bold mb-16"
                >
                  {["FEATURES", "MANAGEMENT", "ABOUT", "CONTACT"].map((text, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {text}
                      <br />
                    </motion.div>
                  ))}
                </motion.h2>
                
                <motion.div 
                  className="grid grid-cols-2 gap-8 text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div>
                    {["QR Access", "Real-time Tracking", "Stock Alerts"].map((text, i) => (
                      <motion.div
                        key={text}
                        whileHover={{ x: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={`/${text.toLowerCase().replace(' ', '-')}`} className="block hover:text-gray-300">
                          {text}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    {["Dashboard", "Products", "Analytics"].map((text, i) => (
                      <motion.div
                        key={text}
                        whileHover={{ x: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={`/${text.toLowerCase()}`} className="block hover:text-gray-300">
                          {text}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discover Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-16 right-16 z-10"
      >
        <Link href="#services">
          <motion.div
            whileHover={{ x: 10 }}
            className="group flex items-center gap-2 text-xl"
          >
            <span>Discover</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ x: [0, 10, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </motion.svg>
          </motion.div>
        </Link>
      </motion.div>

      {/* Footer */}
      <footer className={`relative ${
        theme === 'dark'
          ? 'bg-black text-white border-t border-white/10'
          : 'bg-white text-black border-t border-black/10'
      } py-16 px-16`}>
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-4 gap-8 mb-16">
            {/* Brand and Tagline */}
            <div className="col-span-2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[64px] font-bold leading-none tracking-wider"
              >
                THE FUTURE
                <br />
                OF INVENTORY
              </motion.h2>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <Link href="/features" className="block hover:text-gray-300">Features</Link>
              <Link href="/technology" className="block hover:text-gray-300">Technology</Link>
              <Link href="/about" className="block hover:text-gray-300">About</Link>
              <Link href="/contact" className="block hover:text-gray-300">Contact</Link>
            </div>

            {/* Additional Links */}
            <div className="space-y-4">
              <Link href="/demo" className="block hover:text-gray-300">Request Demo</Link>
              <Link href="/documentation" className="block hover:text-gray-300">Documentation</Link>
              <Link href="/support" className="block hover:text-gray-300">Support</Link>
              <Link href="/partners" className="block hover:text-gray-300">Partners</Link>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex justify-between items-center pt-8 border-t border-white/10">
            {/* Social Links */}
            <div className="flex gap-6">
              <Link href="https://instagram.com" className="hover:opacity-70">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="https://twitter.com" className="hover:opacity-70">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="hover:opacity-70">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Copyright and Legal */}
            <div className="flex gap-8 text-sm text-gray-400">
              <span>© 2024 Smart Inventory. All rights reserved.</span>
              <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/legal" className="hover:text-white">Legal</Link>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}

const features = [
  {
    title: "QR Code Access",
    description: "Quick access to your inventory system through unique QR codes for each store."
  },
  {
    title: "Real-time Tracking",
    description: "Monitor your stock levels in real-time and receive instant updates."
  },
  {
    title: "Low Stock Alerts",
    description: "Get notified automatically when products are running low."
  },
  {
    title: "Easy Management",
    description: "Add, update, or remove products with our user-friendly interface."
  },
  {
    title: "Mobile Friendly",
    description: "Access your inventory system from any device, anywhere."
  },
  {
    title: "Detailed Analytics",
    description: "Get insights into your inventory movements and patterns."
  }
];