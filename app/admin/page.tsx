'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/axios';
import { motion } from 'framer-motion';

interface ExportRequest {
  _id: string;
  product: {
    title: string;
    quantity: number;
  };
  user: {
    name: string;
    email: string;
  };
  quantity: number;
  transportType: string;
  laborers: string;
  destination: string;
  status: 'pending' | 'approved' | 'rejected';
  totalCost: number;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ExportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAdminAccess();
    fetchExportRequests();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data.user.role !== 'admin') {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/login');
    }
  };

  const fetchExportRequests = async () => {
    try {
      const response = await api.get('/export');
      setRequests(response.data.transactions);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch export requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await api.patch(`/export/${id}`, { status });
      fetchExportRequests(); // Refresh the list
      alert(`Request ${status} successfully`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen bg-gray-900 pt-20 text-white">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 pt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Export Requests</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {requests.map((request) => (
                  <motion.tr 
                    key={request._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 text-sm text-white">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">{request.user.name}</div>
                      <div className="text-xs text-gray-400">{request.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">{request.product.title}</div>
                      <div className="text-xs text-gray-400">Qty: {request.quantity}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">{request.transportType}</div>
                      <div className="text-xs text-gray-400">{request.destination}</div>
                      <div className="text-xs text-gray-400">Workers: {request.laborers}</div>
                      <div className="text-xs text-white">Cost: ₹{request.totalCost}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'approved' ? 'bg-green-900 text-green-300' :
                        request.status === 'rejected' ? 'bg-red-900 text-red-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {request.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(request._id, 'approved')}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(request._id, 'rejected')}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
