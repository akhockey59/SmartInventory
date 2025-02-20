'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';
import { useState } from 'react';

export default function Pricing() {
  const { theme } = useTheme();
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for trying out our features",
      features: [
        "Up to 100 items",
        "Basic inventory tracking",
        "1 user included",
        "Mobile app access",
        "Basic reporting",
        "Email support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Basic",
      price: isAnnual ? "₹1,199" : "₹1,499",
      description: "Best for small to medium businesses",
      features: [
        "Up to 1000 items",
        "Advanced inventory tracking",
        "5 users included",
        "Mobile app access",
        "Advanced reporting",
        "Priority email support",
        "Custom categories",
        "Barcode scanning",
        "Export data"
      ],
      cta: "Start Trial",
      popular: true
    },
    {
      name: "Advanced",
      price: isAnnual ? "₹2,999" : "₹3,499",
      description: "For enterprises with complex needs",
      features: [
        "Unlimited items",
        "Enterprise inventory tracking",
        "Unlimited users",
        "Mobile app access",
        "Custom reporting",
        "24/7 phone support",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "Multi-location support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="pt-20 pb-32 relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2072"
            alt="Pricing Background"
            fill
            className={`object-cover ${theme === 'dark' ? 'opacity-10' : 'opacity-5'}`}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Simple, transparent pricing
            </h1>
            <p className={`text-xl mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Choose the perfect plan for your business
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className={`text-sm font-medium ${
                isAnnual 
                  ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                  : 'text-gray-500'
              }`}>
                Annual (Save 20%)
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  isAnnual ? 'bg-red-500' : 'bg-gray-400'
                }`}
              >
                <motion.div
                  className="absolute w-6 h-6 bg-white rounded-full top-1"
                  animate={{ left: isAnnual ? '4px' : '24px' }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-sm font-medium ${
                !isAnnual 
                  ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                  : 'text-gray-500'
              }`}>
                Monthly
              </span>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  theme === 'dark'
                    ? plan.popular 
                      ? 'bg-gray-800 ring-2 ring-red-500' 
                      : 'bg-gray-800'
                    : plan.popular 
                      ? 'bg-white ring-2 ring-red-500 shadow-2xl' 
                      : 'bg-white shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      /month
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg mb-8 ${
                      plan.popular
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex items-center ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
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
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-3xl font-bold text-center mb-12 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, UPI, and net banking. For enterprise plans, we also support invoice-based payments."
              },
              {
                q: "Is there a free trial?",
                a: "Yes, all paid plans come with a 14-day free trial. No credit card required."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-lg p-6 ${
                  theme === 'dark' 
                    ? 'bg-gray-700' 
                    : 'bg-gray-50'
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {faq.q}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 