import React, { useState } from 'react';

function Checkout({ onClose, cartItems, subtotal, deliveryFee, total }) {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [billing, setBilling] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Simulated Payment');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errors, setErrors] = useState({}); // For form validation

  const deliveryDetails = {
    stationName: 'Tech Hub Station',
    expectedDateRange: '2025-03-01 to 2025-03-05',
  };

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const handleBillingChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!shipping.fullName) newErrors.fullName = 'Full Name is required';
    if (!shipping.address) newErrors.address = 'Address is required';
    if (!shipping.city) newErrors.city = 'City is required';
    if (!shipping.postalCode) newErrors.postalCode = 'Postal Code is required';
    if (!shipping.country) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateShipping()) return; // Validate shipping details
    if (step === 2 && paymentMethod !== 'Bank Card') {
      setStep(3); // Skip billing for non-Bank Card payments
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleConfirmOrder = () => {
    const generatedOrderId = 'ORD' + Math.floor(Math.random() * 1000000);
    setOrderId(generatedOrderId);
    setOrderConfirmed(true);
    setStep(paymentMethod === 'Bank Card' ? 5 : 4);
    console.log(`Order confirmed: ${generatedOrderId}`);
    console.log('Email sent with order details.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 text-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Shipping Address</h2>
              <div className="space-y-4">
                {['fullName', 'address', 'city', 'postalCode', 'country'].map((field) => (
                  <div key={field}>
                    <input
                      type="text"
                      name={field}
                      placeholder={
                        field === 'fullName'
                          ? 'Full Name'
                          : field === 'postalCode'
                          ? 'Postal Code'
                          : field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={shipping[field]}
                      onChange={handleShippingChange}
                      className={`w-full p-3 rounded bg-gray-800 border ${
                        errors[field] ? 'border-red-500' : 'border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Payment Method</h2>
              <div className="space-y-4">
                {['Bank Card', 'Mpesa', 'PayPal', 'Simulated Payment'].map((method) => (
                  <label key={method} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={handlePaymentChange}
                      className="form-radio h-5 w-5 text-blue-500"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BILLING DETAILS (if Bank Card) */}
          {step === 3 && paymentMethod === 'Bank Card' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Billing Details</h2>
              <div className="space-y-4">
                {['nameOnCard', 'cardNumber', 'expiry', 'cvv'].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={
                      field === 'nameOnCard'
                        ? 'Name on Card'
                        : field === 'cardNumber'
                        ? 'Card Number'
                        : field === 'expiry'
                        ? 'Expiry (MM/YY)'
                        : 'CVV'
                    }
                    value={billing[field]}
                    onChange={handleBillingChange}
                    className="w-full p-3 rounded bg-gray-800 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 (if NOT Bank Card) OR STEP 4 (if Bank Card): REVIEW & CONFIRM */}
          {(step === 3 && paymentMethod !== 'Bank Card') ||
            (step === 4 && paymentMethod === 'Bank Card') ? (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Review & Confirm</h2>
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="border border-blue-500 p-4 rounded">
                  <h3 className="text-xl font-bold mb-2">Order Summary</h3>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span>Items total ({cartItems.length})</span>
                      <span>Ksh {subtotal}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>Ksh {deliveryFee}</span>
                    </p>
                    <hr className="border-blue-500" />
                    <p className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>Ksh {total}</span>
                    </p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-xl font-bold mb-2">Shipping Address</h3>
                  <p>{shipping.fullName}</p>
                  <p>{shipping.address}</p>
                  <p>
                    {shipping.city}, {shipping.postalCode}
                  </p>
                  <p>{shipping.country}</p>
                </div>

                {/* Billing Details (if Bank Card) */}
                {paymentMethod === 'Bank Card' && (
                  <div>
                    <h3 className="text-xl font-bold mb-2">Billing Details</h3>
                    <p>{billing.nameOnCard}</p>
                    <p>Card ending with {billing.cardNumber.slice(-4)}</p>
                    <p>Expiry: {billing.expiry}</p>
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <h3 className="text-xl font-bold mb-2">Payment Method</h3>
                  <p>{paymentMethod}</p>
                </div>

                {/* Delivery Details */}
                <div>
                  <h3 className="text-xl font-bold mb-2">Delivery Details</h3>
                  <p>Pick-up Station: {deliveryDetails.stationName}</p>
                  <p>Delivery Date Range: {deliveryDetails.expectedDateRange}</p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          ) : null}

          {/* Final Step: ORDER CONFIRMATION */}
          {((paymentMethod === 'Bank Card' && step === 5) || (paymentMethod !== 'Bank Card' && step === 4)) &&
            orderConfirmed && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-6 text-blue-400">Order Confirmation</h2>
                <p className="mb-4">Thank you for your order!</p>
                <p className="mb-4">
                  Your order number is{' '}
                  <span className="font-bold text-blue-300">{orderId}</span>
                </p>
                <div className="border border-blue-500 p-4 rounded mb-6 text-left">
                  <h3 className="text-xl font-bold mb-2 text-blue-300">Invoice</h3>
                  <p>
                    <strong>Order Number:</strong> {orderId}
                  </p>
                  <p>
                    <strong>Pick-up Station:</strong> {deliveryDetails.stationName}
                  </p>
                  <p>
                    <strong>Customer Name:</strong> {shipping.fullName}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {paymentMethod}
                  </p>
                  <p className="mt-2 italic text-sm">
                    An email with your order details has been sent to your registered email address.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Continue Shopping
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;