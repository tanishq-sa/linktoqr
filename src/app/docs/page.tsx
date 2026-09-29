import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Documentation — Link to QR",
  description:
    "REST API documentation for generating QR codes programmatically. Supports PNG, SVG, and Base64 formats with full color customization.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black transition-colors duration-300">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-12 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#007AFF] dark:text-[#0A84FF] hover:underline mb-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Generator
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-4">
              API Documentation
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
              Generate QR codes programmatically with our REST API. No API key required.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                Free
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                No Auth Required
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Base URL */}
            <section className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/5 dark:border-white/10 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Base URL</h2>
              <code className="block px-4 py-3 bg-gray-100 dark:bg-[#2C2C2E] rounded-xl text-sm font-mono text-gray-800 dark:text-gray-200">
                https://linktoqr.dazzelr.tech/api/qr
              </code>
            </section>

            {/* GET Endpoint */}
            <section className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                    GET
                  </span>
                  <code className="text-base font-mono text-gray-800 dark:text-gray-200">/api/qr</code>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Generate a QR code with query parameters. Returns the image directly.
                </p>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Query Parameters</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/5 dark:border-white/10">
                        <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Parameter</th>
                        <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Type</th>
                        <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Default</th>
                        <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-400">
                      <tr className="border-b border-black/5 dark:border-white/5">
                        <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#2C2C2E] rounded text-xs font-mono text-red-600 dark:text-red-400">text*</code></td>
                        <td className="py-3 pr-4">string</td>
                        <td className="py-3 pr-4">—</td>
                        <td className="py-3">URL or text to encode <span className="text-red-500 text-xs">(required)</span></td>
                      </tr>
                      <tr className="border-b border-black/5 dark:border-white/5">
                        <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#2C2C2E] rounded text-xs font-mono">size</code></td>
                        <td className="py-3 pr-4">number</td>
                        <td className="py-3 pr-4">400</td>
                        <td className="py-3">Image width in pixels (50–2000)</td>
                      </tr>
                      <tr className="border-b border-black/5 dark:border-white/5">
                        <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#2C2C2E] rounded text-xs font-mono">fg</code></td>
                        <td className="py-3 pr-4">string</td>
                        <td className="py-3 pr-4">000000</td>
                        <td className="py-3">Foreground color (hex, no #)</td>
                      </tr>
                      <tr className="border-b border-black/5 dark:border-white/5">
                        <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#2C2C2E] rounded text-xs font-mono">bg</code></td>
                        <td className="py-3 pr-4">string</td>
                        <td className="py-3 pr-4">FFFFFF</td>
                        <td className="py-3">Background color (hex, no #)</td>
                      </tr>
                      <tr className="border-b border-black/5 dark:border-white/5">
                        <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#2C2C2E] rounded text-xs font-mono">ecl</code></td>
                        <td className="py-3 pr-4">string</td>
                        <td className="py-3 pr-4">H</td>
                        <td className="py-3">Error correction: L, M, Q, H</td>
                      </tr>
                      <tr className="border-b border-black/5 dark:border-white/5">
                        <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#2C2C2E] rounded text-xs font-mono">format</code></td>
                        <td className="py-3 pr-4">string</td>
                        <td className="py-3 pr-4">png</td>
                        <td className="py-3">Output format: png, svg, base64</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#2C2C2E] rounded text-xs font-mono">margin</code></td>
                        <td className="py-3 pr-4">number</td>
                        <td className="py-3 pr-4">2</td>
                        <td className="py-3">Quiet zone size in modules</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mt-8 mb-4">Example</h3>
                <div className="bg-gray-900 dark:bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-200 whitespace-pre-wrap break-all">
{`# Basic PNG
curl "https://linktoqr.dazzelr.tech/api/qr?text=https://example.com" -o qr.png

# Custom colors + SVG
curl "https://linktoqr.dazzelr.tech/api/qr?text=hello&fg=1A1A2E&bg=E8E8E8&format=svg" -o qr.svg

# Large size with low error correction
curl "https://linktoqr.dazzelr.tech/api/qr?text=https://google.com&size=1000&ecl=L" -o qr.png`}
                  </pre>
                </div>
              </div>
            </section>

            {/* POST Endpoint */}
            <section className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                    POST
                  </span>
                  <code className="text-base font-mono text-gray-800 dark:text-gray-200">/api/qr</code>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Generate a QR code with a JSON request body. Supports all customization options.
                </p>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Request Body (JSON)</h3>
                <div className="bg-gray-900 dark:bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-200">
{`{
  "text": "https://example.com",     // required
  "size": 400,                       // optional (50–2000)
  "foregroundColor": "#000000",      // optional
  "backgroundColor": "#FFFFFF",      // optional
  "errorCorrectionLevel": "H",      // optional (L|M|Q|H)
  "format": "png",                  // optional (png|svg|base64)
  "margin": 2                       // optional
}`}
                  </pre>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mt-8 mb-4">Example</h3>
                <div className="bg-gray-900 dark:bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-200 whitespace-pre-wrap break-all">
{`curl -X POST https://linktoqr.dazzelr.tech/api/qr \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "https://example.com",
    "size": 600,
    "foregroundColor": "#1A1A2E",
    "backgroundColor": "#FFFFFF",
    "format": "png"
  }' -o qr.png`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Response Formats */}
            <section className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/5 dark:border-white/10 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-6">Response Formats</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-[#2C2C2E] rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">PNG</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Binary image response</p>
                  <code className="text-xs font-mono text-gray-600 dark:text-gray-400">Content-Type: image/png</code>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#2C2C2E] rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">SVG</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">SVG markup response</p>
                  <code className="text-xs font-mono text-gray-600 dark:text-gray-400">Content-Type: image/svg+xml</code>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#2C2C2E] rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Base64</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">JSON with data URL</p>
                  <code className="text-xs font-mono text-gray-600 dark:text-gray-400">Content-Type: application/json</code>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mt-6 mb-3">Base64 Response Shape</h3>
              <div className="bg-gray-900 dark:bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-gray-200">
{`{
  "dataUrl": "data:image/png;base64,iVBORw0KGgo...",
  "text": "https://example.com",
  "size": 400,
  "format": "base64"
}`}
                </pre>
              </div>
            </section>

            {/* Error Responses */}
            <section className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/5 dark:border-white/10 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-6">Error Responses</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                All errors return JSON with an <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#2C2C2E] rounded text-xs font-mono">error</code> field.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/5 dark:border-white/10">
                      <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-black/5 dark:border-white/5">
                      <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/20 rounded text-xs font-mono text-red-600 dark:text-red-400">400</code></td>
                      <td className="py-3">Missing <code className="text-xs font-mono">text</code> parameter, invalid color format, or size out of range</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4"><code className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/20 rounded text-xs font-mono text-red-600 dark:text-red-400">500</code></td>
                      <td className="py-3">Internal server error during QR code generation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-gray-900 dark:bg-[#0D0D0D] rounded-xl p-4">
                <pre className="text-sm font-mono text-gray-200">
{`{
  "error": "Missing required parameter: text"
}`}
                </pre>
              </div>
            </section>

            {/* Code Examples */}
            <section className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/5 dark:border-white/10 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-6">Code Examples</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    JavaScript / Fetch
                  </h3>
                  <div className="bg-gray-900 dark:bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-200">
{`// Download as PNG
const response = await fetch(
  "https://linktoqr.dazzelr.tech/api/qr?text=https://example.com&size=600"
);
const blob = await response.blob();
const url = URL.createObjectURL(blob);

// Use in an <img> tag
document.getElementById("qr-img").src = url;`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Python / Requests
                  </h3>
                  <div className="bg-gray-900 dark:bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-200">
{`import requests

response = requests.post(
    "https://linktoqr.dazzelr.tech/api/qr",
    json={
        "text": "https://example.com",
        "size": 800,
        "foregroundColor": "#1A1A2E",
        "format": "png"
    }
)

with open("qr.png", "wb") as f:
    f.write(response.content)`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    HTML / Inline Image
                  </h3>
                  <div className="bg-gray-900 dark:bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-200">
{`<!-- Embed QR code directly in HTML -->
<img
  src="https://linktoqr.dazzelr.tech/api/qr?text=https://example.com&size=200"
  alt="QR Code"
  width="200"
  height="200"
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-black/5 dark:border-white/10 pt-8 pb-12 px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                Made by Tanishq Saini
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                Powered by Next.js • Deploy on Vercel
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#007AFF] dark:hover:text-[#0A84FF]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
                </svg>
                Home
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
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
