'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function MultiBranchStores() {
  const { theme } = useTheme();

  const features = [
    {
      title: "Centralized Control",
      description: "Manage all branches from a single dashboard",
      icon: "🎯"
    },
    {
      title: "Stock Transfer",
      description: "Easy inventory movement between branches",
      icon: "🔄"
    },
    {
      title: "Branch Analytics",
      description: "Compare performance across locations",
      icon: "📊"
    },
    {
      title: "Role Management",
      description: "Set permissions per branch and staff",
      icon: "🔐"
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
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070"
                alt="Multi Branch Dark"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
              alt="Multi Branch Light"
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
              Multi-Branch Solutions
            </h1>
            <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Seamlessly manage multiple store locations with unified control.
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
                alt="Features Dark"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/80" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073"
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

      {/* Management Dashboard Preview */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          {theme === 'dark' ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
                alt="Dashboard Dark"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
              alt="Dashboard Light"
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
              Unified Management Dashboard
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Control all your branches from a single, powerful interface.
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
              Request Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 