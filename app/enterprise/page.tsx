'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from '../lib/axios';

interface Product {
  _id: string;
  title: string;
  quantity: number;
  description: string;
  category: string;
}

export default function Enterprise() {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    transportType: 'truck',
    laborers: '2',
    destination: '',
    urgency: 'normal',
    note: ''
  });

  const transportOptions = [
    { id: 'truck', name: 'Truck', basePrice: 5000, capacity: '1000kg' },
    { id: 'van', name: 'Van', basePrice: 3000, capacity: '500kg' },
    { id: 'tempo', name: 'Tempo', basePrice: 2000, capacity: '300kg' }
  ];

  const laborerOptions = [
    { value: '2', label: '2 Workers', price: 1000 },
    { value: '4', label: '4 Workers', price: 1800 },
    { value: '6', label: '6 Workers', price: 2500 }
  ];

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const fetchUserProducts = async () => {
    try {
      const response = await axios.get('/products/user');
      console.log('API Response:', response.data);
      if (response.data.products) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = () => {
    const transport = transportOptions.find(t => t.id === formData.transportType);
    const laborers = laborerOptions.find(l => l.value === formData.laborers);
    
    const transportCost = transport?.basePrice || 0;
    const laborCost = laborers?.price || 0;
    
    return {
      transportCost,
      laborCost,
      totalCost: transportCost + laborCost
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const costs = calculateTotalCost();
    
    try {
      const response = await axios.post('/export', {
        ...formData,
        ...costs,
        status: 'pending',
      });

      if (response.status === 201) {
        alert('Export request submitted successfully!');
        setFormData({
          productId: '',
          quantity: '',
          transportType: 'truck',
          laborers: '2',
          destination: '',
          urgency: 'normal',
          note: ''
        });
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  const selectedProduct = products.find(p => p._id === formData.productId);

  const awards = [
    {
      title: "High Performer",
      category: "Enterprise",
      period: "WINTER 2024",
    },
    {
      title: "Best Support",
      category: "Enterprise",
      period: "WINTER 2024",
    },
    {
      title: "User Favorite",
      category: "Inventory",
      period: "WINTER 2024",
    },
    {
      title: "Leader",
      category: "Enterprise Solutions",
      period: "WINTER 2024",
    }
  ];

  const features = [
    {
      title: "Multi-Location Management",
      description: "Control inventory across multiple warehouses and stores",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
    },
    {
      title: "Advanced Analytics",
      description: "Get deep insights into your inventory performance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
    },
    {
      title: "Team Collaboration",
      description: "Work seamlessly with your entire organization",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070"
          alt="Enterprise Hero"
          fill
          className="object-cover"
          priority
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Awards and Heading */}
            <div>
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {awards.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-black/20' : 'bg-white/20'}`}
                  >
                    <h3 className="font-bold">{award.title}</h3>
                    <p className="text-sm">{award.period}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.h1
                className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Inventory management software that's perfect for{' '}
                <span className="text-red-500">large teams</span>.
              </motion.h1>
            </div>

            {/* Export Request Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-black/20' : 'bg-white/20'}`}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Request Product Export</h2>

              {loading ? (
                <div className="text-white">Loading products...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Product Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Select Product*
                    </label>
                    <select
                      value={formData.productId}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        productId: e.target.value,
                        quantity: '' // Reset quantity when product changes
                      }))}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      required
                    >
                      <option value="">Choose a product</option>
                      {products.map(product => (
                        <option key={product._id} value={product._id}>
                          {product.title} - {product.category} (Available: {product.quantity})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Quantity*
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        quantity: e.target.value
                      }))}
                      max={selectedProduct?.quantity || 0}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      required
                    />
                    {selectedProduct && (
                      <p className="mt-1 text-sm text-gray-400">
                        Maximum available: {selectedProduct.quantity}
                      </p>
                    )}
                  </div>

                  {/* Transport Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Transport Type*
                    </label>
                    <select
                      value={formData.transportType}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        transportType: e.target.value
                      }))}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      required
                    >
                      {transportOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name} - Capacity: {option.capacity} - ₹{option.basePrice}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Laborers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Number of Laborers*
                    </label>
                    <select
                      value={formData.laborers}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        laborers: e.target.value
                      }))}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      required
                    >
                      {laborerOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label} - ₹{option.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Destination Address*
                    </label>
                    <textarea
                      value={formData.destination}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        destination: e.target.value
                      }))}
                      rows={3}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        note: e.target.value
                      }))}
                      rows={3}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  {/* Cost Summary */}
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Cost Summary</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>Transport Cost: ₹{calculateTotalCost().transportCost}</p>
                      <p>Labor Cost: ₹{calculateTotalCost().laborCost}</p>
                      <p className="text-lg font-bold text-white">
                        Total Cost: ₹{calculateTotalCost().totalCost}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700"
                    type="submit"
                  >
                    Submit Export Request
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Enterprise-Grade Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 relative">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070"
          alt="Integration Background"
          fill
          className="object-cover"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Seamless Integration
            </h2>
            <p className={`text-xl mb-12 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              Connect with your existing tools and workflows
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Success Stories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070"
                alt="Success Story 1"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070"
                alt="Success Story 2"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Industries Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Industries</h3>
              <ul className="space-y-2">
                {[
                  'Construction',
                  'Medical',
                  'Warehouse',
                  'Interior Design & Staging',
                  'Automotive',
                  'Dental',
                  'Events',
                  'Non-Profit',
                  'Education',
                  'Retail',
                  'Antiques',
                  'Government',
                  'Aviation',
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    View All
                  </a>
                </li>
              </ul>
            </div>

            {/* Uses Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Uses</h3>
              <ul className="space-y-2">
                {[
                  'Inventory Management',
                  'Supplies & Consumables Tracking',
                  'Asset Tracking',
                  'Parts Tracking',
                  'Raw Materials Tracking',
                  'Tool Tracking',
                  'Equipment Tracking',
                  'PPE Tracking',
                  'IT Asset Tracking',
                  'Selling & Ecommerce Inventory Tracking',
                  'Barcode Inventory',
                  'Inventory App',
                  'Home Inventory Management',
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    View All
                  </a>
                </li>
              </ul>
            </div>

            {/* Information Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                {[
                  'Pricing',
                  'Blog',
                  'Glossary',
                  'About Us',
                  'Reviews',
                  'Contact Us',
                  'Careers',
                  'Help Center',
                  'Status',
                  'Terms of Service',
                  'Privacy Policy',
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download & Newsletter Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Download</h3>
              <div className="flex flex-col space-y-4">
                <a href="#" className="w-36">
                  <Image
                    src="/app-store-badge.png"
                    alt="Download on the App Store"
                    width={140}
                    height={42}
                  />
                </a>
                <a href="#" className="w-36">
                  <Image
                    src="/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                  />
                </a>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-2">Become an Inventory Insider:</h4>
                <p className="text-sm text-gray-400 mb-4">
                  All the inventory news & insights you need, delivered straight to your inbox every week.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 rounded-md bg-white text-black"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                ©2025 Sortly Inc. All rights reserved. All other logos and trademarks are the property of their respective owners.
                <br />
                All prices shown on the website and in product are in USD.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {[
                  { icon: 'facebook', href: '#' },
                  { icon: 'twitter', href: '#' },
                  { icon: 'instagram', href: '#' },
                  { icon: 'linkedin', href: '#' },
                  { icon: 'youtube', href: '#' },
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social.icon}</span>
                    <i className={`fab fa-${social.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 