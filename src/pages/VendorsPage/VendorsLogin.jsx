import React, { useState } from "react";
import logo from "../../assets/Logo 1.png";

const VendorsLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Market Prime" className="h-10" />
        </div>
        <h2 className="text-center text-2xl font-semibold mb-4">Welcome</h2>
        <p className="text-center text-gray-600 mb-8">Enter your login details</p>
        
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12m0 0c0 2.761-2.239 5-5 5S5 14.761 5 12s2.239-5 5-5 5 2.239 5 5zm0 0a9 9 0 01-9 9m18 0a9 9 0 01-9-9m0 0a9 9 0 010-18m0 0a9 9 0 019 9m0 0a9 9 0 010 18m-9 0a9 9 0 01-9-9" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.988 5.688L5 9.676M5 9.676l-.207-.2c-2.11-2.12-2.112-5.543 0-7.665a5.5 5.5 0 017.778-.293M5 9.676l8.485 8.486M17.453 17.454a5.5 5.5 0 010 7.778l-2.707 2.707m3.415-10.607l-6.364-6.365" />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <label className="inline-flex items-center text-sm">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm">
            Don’t have an account yet?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VendorsLogin;
