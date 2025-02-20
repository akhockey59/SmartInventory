'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function ProductManagement() {
  const { theme } = useTheme();

  const features = [
    {
      title: "Bulk Operations",
      description: "Manage multiple products simultaneously",
      icon: "📦",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070"
    },
    {
      title: "Smart Categories",
      description: "Organize products with intelligent categorization",
      icon: "🏷️",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076"
    },
    {
      title: "Inventory Tracking",
      description: "Real-time stock level monitoring",
      icon: "📊",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
    },
    {
      title: "Price Management",
      description: "Dynamic pricing and cost tracking",
      icon: "💰",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2076"
    }
  ];

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
            alt="Product Management"
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'}`} />
        </div>
        
        <div className="relative z-10 container mx-auto px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl font-bold mb-6">Easy Product Management</h1>
            <p className="text-2xl opacity-90">
              Streamline your inventory workflow with our intuitive product management system.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to manage your products effectively
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl ${
                  theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'
                } transition-colors duration-300`}
              >
                <div className="relative h-64">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 ${
                    theme === 'dark' ? 'bg-black/40' : 'bg-white/40'
                  }`} />
                </div>
                <div className="p-8">
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2070"
              alt="Interactive Demo"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/60'}`} />
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-6">See It in Action</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-full text-lg font-medium ${
                  theme === 'dark'
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Try Interactive Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10x", text: "Faster Product Updates" },
              { number: "50%", text: "Reduced Management Time" },
              { number: "99%", text: "Accuracy Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-5xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Join thousands of businesses already using our product management system
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full text-lg font-medium ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}