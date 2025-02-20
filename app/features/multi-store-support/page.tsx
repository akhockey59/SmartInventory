'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function MultiStore() {
  const { theme } = useTheme();

  const features = [
    {
      title: "Centralized Management",
      description: "Manage multiple stores from a single dashboard",
      icon: "🏪"
    },
    {
      title: "Cross-Store Analytics",
      description: "Compare performance across different locations",
      icon: "📊"
    },
    {
      title: "Inventory Transfer",
      description: "Easily move stock between store locations",
      icon: "🔄"
    },
    {
      title: "Role-Based Access",
      description: "Set permissions per store and staff member",
      icon: "🔐"
    }
  ];

  return (
    <main className="min-h-screen text-black">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center"
      >
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070"
                alt="Multi Store Dark"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2069"
              alt="Multi Store Light"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="relative z-10 container mx-auto px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className={`text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Multi-Store Support
            </h1>
            <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Seamlessly manage multiple store locations from a single platform.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073"
                alt="Features Background Dark"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/80" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070"
              alt="Features Background Light"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="relative z-10 container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className={`p-6 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-black/50 backdrop-blur-sm text-white' 
                    : 'bg-white/50 backdrop-blur-sm text-black'
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

      {/* Interactive Demo Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
                alt="Demo Background Dark"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070"
              alt="Demo Background Light"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="relative z-10 container mx-auto px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Experience Multi-Store Management
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              See how easy it is to manage multiple locations in real-time.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`px-8 py-4 rounded-full text-lg font-medium ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Try Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 