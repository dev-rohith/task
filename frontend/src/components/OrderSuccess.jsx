import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 to-violet-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle 
            className="text-violet-500 animate-bounce" 
            size={100} 
          />
        </div>
        <h1 className="text-3xl font-bold text-violet-800 mb-4 animate-pulse">
          Order Successful!
        </h1>
        <p className="text-violet-600 mb-6">
          Your order has been placed and is being processed. 
          You will receive a confirmation email shortly.
        </p>
        <div className="space-y-4">
            <Link to='/'>
          <button 
            className="w-full bg-violet-500 text-white py-3 rounded-lg 
            hover:bg-violet-600 transition-all duration-300 
            transform hover:scale-105 active:scale-95"
          >
            Continue Shopping
          </button>
            </Link>
          <button 
            className="w-full border-2 border-violet-500 text-violet-500 
            py-3 rounded-lg hover:bg-violet-50 transition-all duration-300"
          >
            View Order Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;