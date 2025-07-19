'use client';
import { useState, useEffect } from 'react';
import { FiDownload, FiX } from 'react-icons/fi';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    }
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <FiDownload className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            Install Vendora App
          </h4>
          <p className="text-sm text-gray-500 mb-3">
            Add Vendora to your home screen for quick access
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="px-3 py-1.5 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowInstallPrompt(false)}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}