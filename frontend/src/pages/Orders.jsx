import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
  // Example data for demonstration.
  // Replace these arrays with data fetched from your backend.
  const [ongoingOrders] = useState([]);
  const [canceledOrders] = useState([
    {
      id: 'ORD-1001',
      date: '2025-02-01',
      status: 'Returned',
    },
    {
      id: 'ORD-1002',
      date: '2025-01-15',
      status: 'Canceled',
    },
    {
      id: 'ORD-1003',
      date: '2024-12-20',
      status: 'Returned',
    },
    {
      id: 'ORD-1004',
      date: '2024-11-10',
      status: 'Canceled',
    },
  ]);

  // Manage which tab is active: "ongoing" or "canceled"
  const [selectedTab, setSelectedTab] = useState('ongoing');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Tab Buttons */}
      <div className="border-b mb-6 flex space-x-8">
        <button
          className={`pb-2 text-sm font-semibold transition-colors
            ${selectedTab === 'ongoing' 
              ? 'text-orange-500 border-b-2 border-orange-500' 
              : 'text-gray-500 border-b-2 border-transparent'
            }`}
          onClick={() => setSelectedTab('ongoing')}
        >
          Ongoing/Delivered ({ongoingOrders.length})
        </button>
        <button
          className={`pb-2 text-sm font-semibold transition-colors
            ${selectedTab === 'canceled' 
              ? 'text-orange-500 border-b-2 border-orange-500' 
              : 'text-gray-500 border-b-2 border-transparent'
            }`}
          onClick={() => setSelectedTab('canceled')}
        >
          Canceled/Returned ({canceledOrders.length})
        </button>
      </div>

      {/* Ongoing/Delivered Tab */}
      {selectedTab === 'ongoing' && (
        <>
          {ongoingOrders.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-lg font-semibold mb-2">
                You have placed no orders yet!
              </p>
              <p className="mb-4 text-gray-600">
                All your orders will be saved here for you to access their status anytime.
              </p>
              <Link
                to="/"
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {ongoingOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div className="mb-2 md:mb-0">
                    <p className="font-semibold">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                  </div>
                  <div>
                    <Link
                      to={`/account/orders/${order.id}/invoice`}
                      className="text-blue-600 hover:underline"
                    >
                      View Invoice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Canceled/Returned Tab */}
      {selectedTab === 'canceled' && (
        <>
          {canceledOrders.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-lg font-semibold mb-2">
                You have no canceled or returned orders!
              </p>
              <p className="mb-4 text-gray-600">
                All your orders will be saved here for you to access their status anytime.
              </p>
              <Link
                to="/"
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {canceledOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div className="mb-2 md:mb-0">
                    <p className="font-semibold">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                  </div>
                  <div>
                    <Link
                      to={`/account/orders/${order.id}/invoice`}
                      className="text-blue-600 hover:underline"
                    >
                      View Invoice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
