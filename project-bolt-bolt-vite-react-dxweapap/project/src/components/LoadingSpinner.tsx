import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto"></div>
      <p className="mt-4">Processing your receipt...</p>
    </div>
  );
}