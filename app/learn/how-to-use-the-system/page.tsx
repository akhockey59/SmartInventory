'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function HowToUse() {
  const { theme } = useTheme();

  const steps = [
    {
      title: "Getting Started",
      description: "Learn the basics of navigating the dashboard",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
      steps: [
        "Login to your account",
        "Navigate the dashboard",
        "Understand key metrics",
        "Customize your view"
      ]
    },
    {
      title: "Adding Your First Items",
      description: "Start building your inventory database",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076",
      steps: [
        "Create item categories",
        "Add item details",
        "Upload product images",
        "Set stock levels"
      ]
    },
    {
      title: "Managing Users",
      description: "Set up team access and permissions",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070",
      steps: [
        "Add team members",
        "Set user roles",
        "Configure permissions",
        "Monitor activity logs"
      ]
    }
  ];

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className={`text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              How to Use the System
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              A comprehensive guide to get you started
            </p>
          </motion.div>

          {steps.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`mb-16 p-8 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h2>
                  <p className={`mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {section.description}
                  </p>
                  <ul className="space-y-3">
                    {section.steps.map((step, stepIndex) => (
                      <motion.li
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: stepIndex * 0.1 }}
                        className={`flex items-center ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {step}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 