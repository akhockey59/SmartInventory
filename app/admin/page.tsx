'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/axios';
import { motion } from 'framer-motion';
import React from 'react';

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
  note: string;
  type: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ExportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

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

  const handleRowClick = (requestId: string) => {
    setSelectedRequest(selectedRequest === requestId ? null : requestId);
  };

  const parseExportDetails = (note: string) => {
    const details: any = {};
    
    if (note && note.includes('Export Request')) {
      const lines = note.split('\n');
      lines.forEach(line => {
        if (line.includes('Transport:')) {
          details.transportType = line.split('Transport:')[1].trim();
        }
        if (line.includes('Destination:')) {
          details.destination = line.split('Destination:')[1].trim();
        }
        if (line.includes('Workers:')) {
          details.laborers = line.split('Workers:')[1].trim();
        }
        if (line.includes('Cost:')) {
          details.totalCost = line.split('Cost:')[1].trim();
        }
      });
    }
    return details;
  };

  if (loading) return <div className="min-h-screen bg-gray-900 pt-20 text-white">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 pt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <React.Fragment key={request._id}>
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`hover:bg-gray-700 cursor-pointer ${
                        selectedRequest === request._id ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => handleRowClick(request._id)}
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
                          {request.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {(!request.status || request.status === 'pending') && (
                          <div className="flex gap-2">
                            <motion.button
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusUpdate(request._id, 'approved');
                              }}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Approve
                            </motion.button>
                            <motion.button
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusUpdate(request._id, 'rejected');
                              }}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Reject
                            </motion.button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                    {selectedRequest === request._id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-gray-700"
                      >
                        <td colSpan={6} className="px-6 py-4">
                          <div className="text-white space-y-2">
                            {(() => {
                              const details = parseExportDetails(request.note);
                              return (
                                <>
                                  <p><strong>Transport Type:</strong> {details.transportType || 'Not specified'}</p>
                                  <p><strong>Destination:</strong> {details.destination || 'Not specified'}</p>
                                  <p><strong>Workers Required:</strong> {details.laborers || 'Not specified'}</p>
                                  <p><strong>Total Cost:</strong> ₹{details.totalCost || '0'}</p>
                                </>
                              );
                            })()}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
