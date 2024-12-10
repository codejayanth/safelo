import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { ReceiptViewer } from './components/ReceiptViewer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthForm } from './components/AuthForm';
import { ReceiptList } from './components/ReceiptList';
import { Receipt } from './types';
import { extractTextFromImage, parseReceiptData } from './utils/ocr';
import { Toaster } from 'react-hot-toast';
import { saveReceipt, getUserReceipts, getUser } from './utils/storage';
import toast from 'react-hot-toast';

function App() {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(getUser());
  const [receipts, setReceipts] = useState<Receipt[]>(
    user ? getUserReceipts(user.email) : []
  );

  const handleFileSelect = async (file: File) => {
    if (!user) return;
    setLoading(true);
    try {
      const text = await extractTextFromImage(file);
      const { amount, date, store } = parseReceiptData(text);
      
      const imageUrl = URL.createObjectURL(file);
      
      const newReceipt: Receipt = {
        id: Date.now().toString(),
        image: imageUrl,
        text,
        date,
        amount,
        store,
        userEmail: user.email
      };

      saveReceipt(newReceipt);
      setReceipt(newReceipt);
      setReceipts([...receipts, newReceipt]);
      toast.success('Receipt uploaded successfully!');
    } catch (error) {
      console.error('Error processing receipt:', error);
      toast.error('Error processing receipt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetReminder = (date: string) => {
    if (receipt) {
      const updatedReceipt = { ...receipt, reminderDate: date };
      setReceipt(updatedReceipt);
      const updatedReceipts = receipts.map(r => 
        r.id === receipt.id ? updatedReceipt : r
      );
      setReceipts(updatedReceipts);
      saveReceipt(updatedReceipt);
    }
  };

  const handleAuthSuccess = (email: string) => {
    setUser({ email, password: '' });
    const userReceipts = getUserReceipts(email);
    setReceipts(userReceipts);
    toast.success('Successfully logged in!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Header />
          <AuthForm onSuccess={handleAuthSuccess} />
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {loading ? (
          <LoadingSpinner />
        ) : receipt ? (
          <ReceiptViewer receipt={receipt} onSetReminder={handleSetReminder} />
        ) : (
          <div className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <UploadZone onFileSelect={handleFileSelect} />
              <p className="text-center mt-4 text-gray-400">
                Upload your receipt to extract information and set reminders
              </p>
            </div>
            <ReceiptList receipts={receipts} onSelect={setReceipt} />
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}