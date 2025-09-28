"use client";

import { useState, useRef } from "react";
import CustomQRCode from "./components/CustomQRCode";

export default function Home() {
  const [qrValue, setQrValue] = useState("https://linktoqr.vercel.app");
  const [fileName, setFileName] = useState("Link to QR");
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const downloadFile = async () => {
    setIsDownloading(true);
    try {
      // Get the canvas element from the CustomQRCode component
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) {
        throw new Error('QR code canvas not found');
      }

      // Convert canvas to data URL
      const qrDataURL = canvas.toDataURL('image/png');
      
      // Create a download link for the generated QR PNG
      const link = document.createElement("a");
      link.href = qrDataURL;
      link.download = `${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-16 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Link to QR
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Generate and download QR codes instantly. Perfect for sharing files, links, and more.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* QR Code Section */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Custom QR Code</h2>
                      <div className="inline-block p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <CustomQRCode
                          value={qrValue}
                          size={280}
                          logoUrl={logoUrl}
                          logoSize={60}
                          backgroundColor="#FFFFFF"
                          foregroundColor="#000000"
                        />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Scan with your phone camera
                      </p>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customize</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          File Name
                        </label>
                        <input
                          type="text"
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter file name..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Download URL
                        </label>
                        <input
                          type="url"
                          value={qrValue}
                          onChange={(e) => setQrValue(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white"
                          placeholder="https://example.com/your-file.pdf"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Logo (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-600 dark:file:text-white dark:hover:file:bg-blue-700"
                          />
                        </div>
                        {logoUrl && (
                          <div className="mt-2 flex items-center space-x-2">
                            <img
                              src={logoUrl}
                              alt="Logo preview"
                              className="w-8 h-8 rounded object-cover"
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Logo will appear in QR code center
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="pt-4">
                      <button
                        onClick={downloadFile}
                        disabled={isDownloading}
                        className="w-full inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isDownloading ? (
                          <>
                            <svg
                              className="w-5 h-5 mr-3 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            Generating PNG...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            Download QR Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400">
            <p>Powered by Next.js • Deploy on Vercel</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
