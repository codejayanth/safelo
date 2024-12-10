import React from 'react';
import { Receipt } from '../types';
import { format } from 'date-fns';

interface ReceiptListProps {
  receipts: Receipt[];
  onSelect: (receipt: Receipt) => void;
}

export function ReceiptList({ receipts, onSelect }: ReceiptListProps) {
  const sortedReceipts = [...receipts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Receipts</h2>
      {sortedReceipts.length === 0 ? (
        <p className="text-gray-400">No receipts uploaded yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedReceipts.map((receipt) => (
            <div
              key={receipt.id}
              onClick={() => onSelect(receipt)}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <img
                src={receipt.image}
                alt="Receipt"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <div className="space-y-1">
                <p className="font-medium">{receipt.store || 'Unknown Store'}</p>
                <p className="text-sm text-gray-400">
                  {format(new Date(receipt.date), 'PPP')}
                </p>
                {receipt.amount && (
                  <p className="text-green-400">${receipt.amount}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}