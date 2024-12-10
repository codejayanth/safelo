import React, { useState } from 'react';
import { Calendar, DollarSign, Store } from 'lucide-react';
import { Receipt, NotificationSettings } from '../types';
import { format } from 'date-fns';
import { NotificationForm } from './NotificationForm';
import { scheduleNotification } from '../utils/notifications';
import toast from 'react-hot-toast';

interface ReceiptViewerProps {
  receipt: Receipt;
  onSetReminder: (date: string) => void;
}

export function ReceiptViewer({ receipt, onSetReminder }: ReceiptViewerProps) {
  const [showNotificationForm, setShowNotificationForm] = useState(false);

  const handleSetReminder = async (date: string) => {
    onSetReminder(date);
    setShowNotificationForm(true);
  };

  const handleNotificationSubmit = async (settings: NotificationSettings) => {
    try {
      const updatedReceipt: Receipt = {
        ...receipt,
        notificationMethod: settings.method,
        notificationContact: settings.contact
      };
      
      await scheduleNotification(updatedReceipt);
      toast.success('Notification scheduled successfully!');
      setShowNotificationForm(false);
    } catch (error) {
      toast.error('Failed to schedule notification. Please try again.');
      console.error('Notification error:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={receipt.image}
            alt="Receipt"
            className="rounded-lg max-h-96 w-full object-contain"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Receipt Details</h3>
          
          {receipt.store && (
            <div className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-blue-400" />
              <span>{receipt.store}</span>
            </div>
          )}
          
          {receipt.amount && (
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span>{receipt.amount}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span>{format(new Date(receipt.date), 'PPP')}</span>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Set Reminder Date
            </label>
            <input
              type="date"
              className="bg-gray-700 rounded-md px-3 py-2 w-full"
              onChange={(e) => handleSetReminder(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {showNotificationForm && (
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-4">Set Notification Preferences</h4>
              <NotificationForm onSubmit={handleNotificationSubmit} />
            </div>
          )}

          <div className="mt-4">
            <h4 className="text-lg font-medium mb-2">Extracted Text</h4>
            <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-auto max-h-48">
              {receipt.text}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}