"use client";

import { useState, useRef } from "react";
import CustomQRCode from "./components/CustomQRCode";

export default function Home() {
  const [qrValue, setQrValue] = useState("https://linktoqr.dazzelr.tech");
  const [fileName, setFileName] = useState("Unnamed");
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
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black transition-colors duration-300">
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-16 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white tracking-tight">
                Link to QR
              </h1>
            </div>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Generate and download QR codes instantly. Perfect for sharing files, links, and more.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-sm border border-black/5 dark:border-white/10 overflow-hidden transition-colors duration-300">
              <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* QR Code Section */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold text-black dark:text-white mb-6 tracking-tight">Custom QR Code</h2>
                      <div className="inline-block p-6 bg-white dark:bg-white rounded-3xl shadow-sm border border-gray-100">
                        <CustomQRCode
                          value={qrValue}
                          size={280}
                          logoUrl={logoUrl}
                          logoSize={60}
                          backgroundColor="#FFFFFF"
                          foregroundColor="#000000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-black dark:text-white mb-8 tracking-tight">Customize</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          File Name
                        </label>
                        <input
                          type="text"
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-100 dark:bg-[#2C2C2E] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:bg-white dark:focus:bg-[#1C1C1E] transition-all duration-200 dark:text-white"
                          placeholder="Enter file name..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Download URL
                        </label>
                        <input
                          type="url"
                          value={qrValue}
                          onChange={(e) => setQrValue(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-100 dark:bg-[#2C2C2E] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:bg-white dark:focus:bg-[#1C1C1E] transition-all duration-200 dark:text-white"
                          placeholder="linktoqr.dazzelr.tech"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Logo (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-[#2C2C2E] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF] transition-all duration-200 dark:text-white file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white dark:file:bg-[#1C1C1E] file:text-[#007AFF] dark:file:text-[#0A84FF] file:shadow-sm cursor-pointer"
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
                    <div className="pt-6">
                      <button
                        onClick={downloadFile}
                        disabled={isDownloading}
                        className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#007AFF] hover:bg-[#0066CC] dark:bg-[#0A84FF] dark:hover:bg-[#007AFF] text-white font-semibold text-lg rounded-2xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#007AFF]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
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
        <footer className="mt-8 border-t border-black/5 dark:border-white/10 pt-8 pb-12 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                Made by Tanishq Saini
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                Powered by Next.js • Deploy on Vercel
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://tanishqsa.dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#007AFF] dark:hover:text-[#0A84FF]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Portfolio
              </a>
              <a 
                href="mailto:tanishq@tanishqsa.dev" 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#007AFF] dark:hover:text-[#0A84FF]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
