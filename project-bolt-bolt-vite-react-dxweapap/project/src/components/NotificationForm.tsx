import React, { useState } from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { NotificationSettings } from '../types';

interface NotificationFormProps {
  onSubmit: (settings: NotificationSettings) => void;
}

export function NotificationForm({ onSubmit }: NotificationFormProps) {
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ method, contact });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Notification Method</label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setMethod('email')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              method === 'email' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setMethod('sms')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              method === 'sms' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            SMS
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {method === 'email' ? 'Email Address' : 'Phone Number'}
        </label>
        <input
          type={method === 'email' ? 'email' : 'tel'}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={method === 'email' ? 'your@email.com' : '+1234567890'}
          className="bg-gray-700 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
          pattern={method === 'email' ? undefined : "^\\+?[1-9]\\d{1,14}$"}
          title={method === 'sms' ? "Please enter a valid phone number" : undefined}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !contact}
        className={`w-full py-2 rounded-md transition-colors ${
          isSubmitting || !contact
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Setting up notification...' : 'Set Notification Preference'}
      </button>
    </form>
  );
}