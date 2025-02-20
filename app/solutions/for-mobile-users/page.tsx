'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function MobileUsers() {
  const { theme } = useTheme();

  const features = [
    {
      title: "Native Apps",
      description: "Dedicated iOS and Android applications",
      icon: "📱"
    },
    {
      title: "Offline Mode",
      description: "Work without internet connection",
      icon: "⚡"
    },
    {
      title: "Barcode Scanner",
      description: "Quick inventory checks with your phone camera",
      icon: "📸"
    },
    {
      title: "Push Notifications",
      description: "Stay updated with real-time alerts",
      icon: "🔔"
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
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070"
                alt="Mobile Users Dark"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1551650992-ee4fd47df41f?q=80&w=2074"
              alt="Mobile Users Light"
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
              Mobile-First Solutions
            </h1>
            <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Manage your inventory from anywhere, anytime.
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
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974"
                alt="Features Dark"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/80" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070"
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

      {/* App Store Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055"
                alt="App Store Dark"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2070"
              alt="App Store Light"
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
              Download Our App
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Available on iOS and Android devices.
            </p>
            <div className="flex justify-center gap-4">
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
                App Store
              </motion.button>
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
                Play Store
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 