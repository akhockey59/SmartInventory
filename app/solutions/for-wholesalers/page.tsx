'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function Wholesalers() {
  const { theme } = useTheme();

  const features = [
    {
      title: "Bulk Order Management",
      description: "Handle large orders with ease and efficiency",
      icon: "📦"
    },
    {
      title: "Price Tiers",
      description: "Set different pricing levels for various customer types",
      icon: "💲"
    },
    {
      title: "Order Tracking",
      description: "Real-time updates on order status and delivery",
      icon: "🚚"
    },
    {
      title: "Customer Portal",
      description: "Self-service platform for your B2B customers",
      icon: "🔑"
    }
  ];

  return (
    <main className="min-h-screen text-black">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center"
      >
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
                alt="Wholesale Dark"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070"
              alt="Wholesale Light"
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
              Wholesale Solutions
            </h1>
            <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Streamline your B2B operations with our powerful wholesale platform.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2070"
                alt="Features Dark"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/80" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070"
              alt="Features Light"
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
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

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
                alt="CTA Dark"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
              alt="CTA Light"
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
              Scale Your Wholesale Business
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Experience the power of automated wholesale management.
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
              Schedule Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 