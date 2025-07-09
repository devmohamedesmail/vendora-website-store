'use client'
import React from 'react'
import { FiX, FiAlertTriangle } from 'react-icons/fi'
import { Category } from '../../services/categoryService'

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  category: Category | null;
  loading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  category,
  loading = false
}: DeleteConfirmationModalProps) {
  if (!isOpen || !category) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Category</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-3">
              Are you sure you want to delete <strong className="text-gray-900">{category.name}</strong>?
            </p>
            
            {category.products_count > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                <p className="text-yellow-800 text-sm">
                  <strong>Warning:</strong> This category has {category.products_count} product(s) associated with it.
                </p>
              </div>
            )}

            {category.subcategories && category.subcategories.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                <p className="text-yellow-800 text-sm">
                  <strong>Warning:</strong> This category has {category.subcategories.length} subcategory(ies).
                </p>
              </div>
            )}
            
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              Delete Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
