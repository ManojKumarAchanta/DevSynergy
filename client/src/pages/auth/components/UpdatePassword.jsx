'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
// import AuthLayout from '@/pages/main';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSave = () => {
    if (!newPassword || !confirmPassword) {
      setMessage('Please fill out both password fields.');
      setMessageType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New Password and Confirm Password do not match.');
      setMessageType('error');
      return;
    }

    setMessage('Password has been updated successfully.');
    setMessageType('success');

    console.log('Password saved:', newPassword);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">Create New Password</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {message && (
          <p
            className={`mb-4 text-sm font-medium ${
              messageType === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            className="bg-black text-white"
            onClick={handleBackToLogin}
          >
            Back to Login
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UpdatePassword;
