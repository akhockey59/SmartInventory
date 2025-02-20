'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function POSIntegration() {
  const { theme } = useTheme();

  const sections = [
    {
      title: "POS Integration Setup",
      description: "Connect your POS system seamlessly",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070",
      steps: [
        "Choose your POS system",
        "Configure API settings",
        "Set sync preferences",
        "Test connection"
      ]
    },
    {
      title: "Real-time Sync",
      description: "Keep your inventory in sync",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      steps: [
        "Automatic stock updates",
        "Sales synchronization",
        "Return processing",
        "Error handling"
      ]
    },
    {
      title: "Reports & Analytics",
      description: "Get insights from your data",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      steps: [
        "Sales reports",
        "Inventory analytics",
        "Performance metrics",
        "Custom dashboards"
      ]
    }
  ];

  const supportedPOS = [
    {
      name: "Shopify POS",
      logo: "https://logo.clearbit.com/shopify.com",
    },
    {
      name: "Square",
      logo: "https://logo.clearbit.com/squareup.com",
    },
    {
      name: "Lightspeed",
      logo: "https://logo.clearbit.com/lightspeedhq.com",
    },
    {
      name: "Clover",
      logo: "https://logo.clearbit.com/clover.com",
    },
    {
      name: "Toast",
      logo: "https://logo.clearbit.com/toasttab.com",
    },
    {
      name: "Vend",
      logo: "https://logo.clearbit.com/vendhq.com",
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
              Integration with POS Systems
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Connect your POS system for seamless inventory management
            </p>
          </motion.div>

          {sections.map((section, index) => (
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
            className={`p-8 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-lg'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-8 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Supported POS Systems
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {supportedPOS.map((pos, index) => (
                <motion.div
                  key={pos.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 relative mb-4 bg-white rounded-lg p-4 shadow-sm">
                    <Image
                      src={pos.logo}
                      alt={pos.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <p className={`text-sm text-center ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {pos.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 