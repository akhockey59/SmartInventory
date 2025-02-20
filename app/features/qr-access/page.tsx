'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function QRCodeAccess() {
  const { theme } = useTheme();

  const features = [
    {
      title: "Instant Scanning",
      description: "Scan QR codes instantly to access item details",
      icon: "⚡"
    },
    {
      title: "Secure Access",
      description: "Role-based permissions for inventory access",
      icon: "🔒"
    },
    {
      title: "Bulk Generation",
      description: "Generate QR codes for multiple items at once",
      icon: "📑"
    },
    {
      title: "Custom Information",
      description: "Embed custom data in QR codes",
      icon: "🎯"
    }
  ];

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center"
      >
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <Image
              src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070"
              alt="QR Code Access Dark"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2070"
              alt="QR Code Access Light"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-black/70' 
              : 'bg-white/70'
          }`} />
        </div>
        
        <div className="relative z-10 container mx-auto px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl font-bold mb-6">QR Code-Based Access</h1>
            <p className="text-2xl opacity-90">
              Streamline your inventory management with quick and secure QR code scanning.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className={`py-20 relative`}>
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <Image
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
              alt="Features Background Dark"
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
              alt="Features Background Light"
              fill
              className="object-cover"
            />
          )}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-black/80' 
              : 'bg-white/80'
          }`} />
        </div>

        <div className="relative z-10 container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-black/50 backdrop-blur-sm' 
                    : 'bg-white/50 backdrop-blur-sm'
                } transition-colors duration-300`}
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

      {/* Demo Section with different background */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070"
              alt="Demo Background Dark"
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
              alt="Demo Background Light"
              fill
              className="object-cover"
            />
          )}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-black/70' 
              : 'bg-white/70'
          }`} />
        </div>

        <div className="relative z-10 container mx-auto px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">See It in Action</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full text-lg font-medium ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Start Using it
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 