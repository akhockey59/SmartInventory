'use client';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Image from 'next/image';

export default function StockTracking() {
  const { theme } = useTheme();

  const features = [
    {
      title: "Live Updates",
      description: "Get instant updates on stock levels as changes occur",
      icon: "📊"
    },
    {
      title: "Smart Alerts",
      description: "Receive notifications when stock reaches critical levels",
      icon: "🔔"
    },
    {
      title: "Mobile Access",
      description: "Track your inventory from anywhere using our mobile app",
      icon: "📱"
    },
    {
      title: "Analytics",
      description: "Detailed insights and reporting for better decisions",
      icon: "📈"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426"
            alt="Stock Tracking Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Real-Time Stock Tracking
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Monitor your inventory in real-time with advanced tracking
              capabilities and instant updates.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=239"
            alt="Features Background"
            fill
            className="object-cover"
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/90' : 'bg-white/90'}`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-lg backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-black/50 text-white'
                    : 'bg-white/50 text-black'
                }`}
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2426"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-red-600 text-white rounded-full text-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Try It Free
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 