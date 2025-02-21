import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  // Load cart items from localStorage or use default
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: '15 Car Power Inverter w/ Double Ports & USB',
            price: 1999,
            quantity: 1,
            image: 'https://via.placeholder.com/100',
          },
        ];
  });

  const [recommendedItems] = useState([
    {
      id: 10,
      name: 'P47 Bluetooth Headphone',
      price: 499,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 11,
      name: '220 Inverter 150W DC-12',
      price: 1500,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(Math.max(1, newQuantity), 10),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );
  const deliveryFee = cartItems.length > 0 ? 180 : 0;
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  const formatPrice = (price) =>
    price.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Cart ({cartItems.length})
        </h1>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Continue Shopping →
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full lg:w-2/3">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-600">{formatPrice(item.price)}</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = Math.min(
                            Math.max(1, parseInt(e.target.value) || 1),
                            10
                          );
                          handleQuantityChange(item.id, newQty);
                        }}
                        className="w-16 text-center border rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        max="10"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= 10}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Increase quantity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Recommended for You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedItems.map((recItem) => (
                    <div
                      key={recItem.id}
                      className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={recItem.image}
                        alt={recItem.name}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {recItem.name}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {formatPrice(recItem.price)}
                        </p>
                        <button
                          onClick={() => handleAddToCart(recItem)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-800">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee:</span>
                <span className="font-medium text-gray-800">
                  {formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-blue-600">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
