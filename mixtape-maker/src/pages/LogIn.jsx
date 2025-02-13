import React from 'react';
import UserLogin from '../components/UserLogin'; 

const LogIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Log In to Your Account
        </h1>

        <UserLogin />

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:text-blue-700">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
