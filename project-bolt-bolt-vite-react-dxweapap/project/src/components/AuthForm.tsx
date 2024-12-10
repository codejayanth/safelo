import React, { useState } from 'react';
import { saveUser, getUser } from '../utils/storage';
import toast from 'react-hot-toast';

interface AuthFormProps {
  onSuccess: (email: string) => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const user = getUser();
        if (user && user.email === email && user.password === password) {
          onSuccess(email);
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        saveUser(email, password);
        onSuccess(email);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Login' : 'Create Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition-colors disabled:bg-gray-600"
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="w-full text-center mt-4 text-blue-400 hover:text-blue-300"
      >
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
      </button>
    </div>
  );
}