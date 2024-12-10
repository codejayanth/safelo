import React from 'react';
import { Receipt as ReceiptIcon } from 'lucide-react';
import logo from '../assets/logo.svg';

export function Header() {
  return (
    <div className="flex items-center justify-between mb-8 px-4">
      <div className="flex items-center">
        <img src={logo} alt="Receipt Manager Logo" className="w-12 h-12 mr-4" />
        <h1 className="text-3xl font-bold">Receipt Manager</h1>
      </div>
      <ReceiptIcon className="w-8 h-8 text-blue-400" />
    </div>
  );
}