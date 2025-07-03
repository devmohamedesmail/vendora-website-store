'use client';

import React from 'react';

export function PersistLoading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your cart and wishlist...</p>
      </div>
    </div>
  );
}
