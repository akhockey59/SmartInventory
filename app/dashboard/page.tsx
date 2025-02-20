'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '../lib/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

interface Product {
  _id: string;
  title: string;
  description: string;
  quantity: number;
  category: string;
  qrCode: string;
}

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products/user');
      setProducts(response.data.products);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'inventory'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'analytics'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('qr-codes')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'qr-codes'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            QR Codes
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg p-6">
          {activeTab === 'inventory' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Inventory</h2>
                <Link
                  href="/dashboard/add-product"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Add Product
                </Link>
              </div>
              
              {loading ? (
                <div className="text-center text-gray-400">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-700 rounded-lg p-6"
                    >
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                          Quantity: {product.quantity}
                        </span>
                        <span className="text-gray-400">
                          Category: {product.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Total Products
                  </h3>
                  <p className="text-3xl font-bold text-white">
                    {products.length}
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Low Stock Items
                  </h3>
                  <p className="text-3xl font-bold text-white">
                    {products.filter((p) => p.quantity <= 10).length}
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Total Quantity
                  </h3>
                  <p className="text-3xl font-bold text-white">
                    {products.reduce((sum, product) => sum + product.quantity, 0)}
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Categories
                  </h3>
                  <p className="text-3xl font-bold text-white">
                    {new Set(products.map(p => p.category)).size}
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stock Levels Bar Chart */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Stock Levels</h3>
                  <Bar
                    data={{
                      labels: products.map(p => p.title),
                      datasets: [{
                        label: 'Quantity',
                        data: products.map(p => p.quantity),
                        backgroundColor: 'rgba(239, 68, 68, 0.5)',
                        borderColor: 'rgb(239, 68, 68)',
                        borderWidth: 1
                      }]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          labels: {
                            color: 'white'
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                          },
                          ticks: {
                            color: 'white'
                          }
                        },
                        x: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                          },
                          ticks: {
                            color: 'white'
                          }
                        }
                      }
                    }}
                  />
                </div>

                {/* Category Distribution Pie Chart */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Category Distribution</h3>
                  <Pie
                    data={{
                      labels: Array.from(new Set(products.map(p => p.category))),
                      datasets: [{
                        data: Array.from(new Set(products.map(p => p.category))).map(
                          category => products.filter(p => p.category === category).length
                        ),
                        backgroundColor: [
                          'rgba(239, 68, 68, 0.5)',
                          'rgba(59, 130, 246, 0.5)',
                          'rgba(16, 185, 129, 0.5)',
                          'rgba(251, 191, 36, 0.5)',
                          'rgba(139, 92, 246, 0.5)'
                        ],
                        borderColor: [
                          'rgb(239, 68, 68)',
                          'rgb(59, 130, 246)',
                          'rgb(16, 185, 129)',
                          'rgb(251, 191, 36)',
                          'rgb(139, 92, 246)'
                        ],
                        borderWidth: 1
                      }]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            color: 'white'
                          }
                        }
                      }
                    }}
                  />
                </div>

                {/* Stock History Line Chart (Mock Data) */}
                <div className="bg-gray-700 rounded-lg p-6 col-span-full">
                  <h3 className="text-lg font-semibold text-white mb-4">Stock History</h3>
                  <Line
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [{
                        label: 'Total Stock',
                        data: [120, 190, 300, 250, 280, 320],
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.5)',
                        tension: 0.4
                      }]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          labels: {
                            color: 'white'
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                          },
                          ticks: {
                            color: 'white'
                          }
                        },
                        x: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                          },
                          ticks: {
                            color: 'white'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr-codes' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">QR Codes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gray-700 rounded-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {product.title}
                    </h3>
                    {product.qrCode ? (
                      <img
                        src={product.qrCode}
                        alt={`QR Code for ${product.title}`}
                        className="w-full"
                      />
                    ) : (
                      <button
                        onClick={() => {/* Generate QR code */}}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Generate QR Code
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}