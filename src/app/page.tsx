"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomQRCode, { CustomQRCodeRef } from "./components/CustomQRCode";
import { ToastContainer, useToast } from "./components/Toast";

export default function Home() {
  const [qrValue, setQrValue] = useState("https://linktoqr.dazzelr.tech");
  const [fileName, setFileName] = useState("Unnamed");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [urlError, setUrlError] = useState("");
  const qrRef = useRef<CustomQRCodeRef>(null);
  const { toasts, addToast, removeToast } = useToast();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const validateUrl = (url: string) => {
    if (!url.trim()) {
      setUrlError("URL is required");
      return false;
    }
    try {
      new URL(url);
      setUrlError("");
      return true;
    } catch {
      setUrlError("Please enter a valid URL (e.g. https://example.com)");
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setQrValue(url);
    if (urlError) validateUrl(url);
  };

  const handleUrlBlur = () => {
    if (qrValue.trim()) validateUrl(qrValue);
  };

  const getCanvas = useCallback((): HTMLCanvasElement | null => {
    return qrRef.current?.getCanvas() ?? null;
  }, []);

  const downloadFile = async () => {
    if (!validateUrl(qrValue)) return;
    setIsDownloading(true);
    try {
      const canvas = getCanvas();
      if (!canvas) throw new Error("QR code canvas not found");

      const qrDataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = qrDataURL;
      link.download = `${fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast("QR code downloaded successfully!", "success");
    } catch (error) {
      console.error("Error generating QR code:", error);
      addToast("Failed to download QR code. Please try again.", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadSVG = async () => {
    if (!validateUrl(qrValue)) return;
    try {
      const encodedText = encodeURIComponent(qrValue);
      const fgParam = fgColor.replace("#", "");
      const bgParam = bgColor.replace("#", "");
      const res = await fetch(`/api/qr?text=${encodedText}&format=svg&fg=${fgParam}&bg=${bgParam}`);
      if (!res.ok) throw new Error("Failed to generate SVG");
      const svgText = await res.text();
      const blob = new Blob([svgText], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_qr.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast("SVG downloaded successfully!", "success");
    } catch (error) {
      console.error("Error downloading SVG:", error);
      addToast("Failed to download SVG. Please try again.", "error");
    }
  };

  const copyToClipboard = async () => {
    if (!validateUrl(qrValue)) return;
    setIsCopying(true);
    try {
      const canvas = getCanvas();
      if (!canvas) throw new Error("QR code canvas not found");

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed to create blob"))), "image/png");
      });

      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      addToast("QR code copied to clipboard!", "success");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      addToast("Failed to copy. Your browser may not support this.", "error");
    } finally {
      setIsCopying(false);
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
                      <div className="inline-block p-6 bg-white dark:bg-white rounded-3xl shadow-sm border border-gray-100 transition-transform duration-300 hover:scale-[1.02]">
                        <CustomQRCode
                          ref={qrRef}
                          value={qrValue}
                          size={280}
                          logoUrl={logoUrl}
                          logoSize={60}
                          backgroundColor={bgColor}
                          foregroundColor={fgColor}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={copyToClipboard}
                        disabled={isCopying}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#3A3A3C] active:scale-95 transition-all duration-200 disabled:opacity-50"
                        title="Copy to clipboard"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {isCopying ? "Copying..." : "Copy"}
                      </button>
                      <button
                        onClick={downloadSVG}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#3A3A3C] active:scale-95 transition-all duration-200"
                        title="Download as SVG"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        SVG
                      </button>
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
                          onChange={handleUrlChange}
                          onBlur={handleUrlBlur}
                          className={`w-full px-4 py-3 bg-gray-100 dark:bg-[#2C2C2E] border rounded-xl focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-[#1C1C1E] transition-all duration-200 dark:text-white ${
                            urlError
                              ? "border-red-400 focus:ring-red-400"
                              : "border-transparent focus:ring-[#007AFF]"
                          }`}
                          placeholder="https://example.com"
                        />
                        {urlError && (
                          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {urlError}
                          </p>
                        )}
                      </div>

                      {/* Color Pickers */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            QR Color
                          </label>
                          <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 dark:bg-[#2C2C2E] rounded-xl">
                            <input
                              type="color"
                              value={fgColor}
                              onChange={(e) => setFgColor(e.target.value)}
                              className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-2 [&::-webkit-color-swatch]:border-gray-200"
                            />
                            <span className="text-sm font-mono text-gray-600 dark:text-gray-400 uppercase">
                              {fgColor}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Background
                          </label>
                          <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 dark:bg-[#2C2C2E] rounded-xl">
                            <input
                              type="color"
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-2 [&::-webkit-color-swatch]:border-gray-200"
                            />
                            <span className="text-sm font-mono text-gray-600 dark:text-gray-400 uppercase">
                              {bgColor}
                            </span>
                          </div>
                        </div>
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
                            <Image
                              src={logoUrl}
                              alt="Logo preview"
                              width={32}
                              height={32}
                              className="rounded object-cover"
                              unoptimized
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Logo will appear in QR code center
                            </span>
                            <button
                              onClick={() => setLogoUrl("")}
                              className="ml-auto text-xs text-red-500 hover:text-red-600 transition-colors"
                            >
                              Remove
                            </button>
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

        {/* FAQ Section */}
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {[
                {
                  q: "Is this tool free to use?",
                  a: "Yes! Link to QR is completely free. Generate and download unlimited QR codes with no sign-up or watermarks.",
                },
                {
                  q: "What formats can I download?",
                  a: "You can download QR codes as PNG (raster) or SVG (vector). SVG is ideal for print materials since it scales to any size without losing quality.",
                },
                {
                  q: "Can I add my logo to the QR code?",
                  a: "Absolutely. Upload any image and it will be placed in the center of your QR code. We use high error correction (Level H) to ensure the code remains scannable.",
                },
                {
                  q: "Will the QR code still scan with custom colors?",
                  a: "Yes, as long as there's sufficient contrast between the foreground and background colors. Avoid light foreground colors on light backgrounds.",
                },
                {
                  q: "Do you have an API?",
                  a: "Yes! We offer a free REST API for programmatic QR code generation. Check out our API Documentation page for endpoints, parameters, and examples.",
                  link: "/docs",
                  linkText: "View API Docs →",
                },
                {
                  q: "Is my data stored anywhere?",
                  a: "No. All QR codes are generated on-the-fly. We don't store your URLs, images, or generated QR codes. Everything stays in your browser.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden transition-all duration-200 hover:shadow-sm"
                >
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                    <span className="text-base font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.q}
                    </span>
                    <svg
                      className="w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.a}
                    {faq.link && (
                      <Link
                        href={faq.link}
                        className="block mt-2 text-[#007AFF] dark:text-[#0A84FF] font-medium hover:underline"
                      >
                        {faq.linkText}
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/5 dark:border-white/10 pt-8 pb-12 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                Made by Tanishq Saini
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                Powered by Next.js • Deploy on Vercel
              </p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link 
                href="/docs"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#007AFF] dark:hover:text-[#0A84FF]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                API Docs
              </Link>
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

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
