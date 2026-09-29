# Next.js QR Download Page – Context

## Overview
This project is a **minimal one-page Next.js website** that provides users with:
- A **QR code** to scan and download a file.
- A **direct download button** for the same file.
- A **preview section** for generating a QR code.
- A **REST API** for programmatic QR code generation.

No authentication, no admin panel — just a clean static page.

## Features
- Built with **Next.js** for fast and SEO-friendly rendering.
- **Single page** with download button + QR code.
- **Responsive design** (works on both desktop and mobile).
- **Custom colors and logo** support for QR codes.
- **Copy to clipboard** and **SVG download** options.
- **REST API** (`/api/qr`) for generating QR codes as PNG, SVG, or Base64.
- Deployable on **Vercel** or any Node.js host.

## Tech Stack
- **Frontend:** Next.js (React, TailwindCSS for styling)
- **QR Code Generation:** `qrcode` NPM package
- **Hosting:** Vercel (recommended)

## Page Structure
1. **Header / Title** → Name of the file or app.
2. **Preview Section** → Generated a QR code preview with color customization.
3. **Download Button** → Direct link to download the QR PNG file.
4. **Action Buttons** → Copy to clipboard, download as SVG.

## API
- `GET /api/qr?text=<url>` → Returns a QR code image (PNG, SVG, or Base64).
- `POST /api/qr` → Accepts JSON body with full customization options.

## Example Flow
- User visits the page.
- Sees file preview (generated a QR code preview).
- Customizes colors and adds optional logo.
- Clicks the **Download button** → QR PNG file starts downloading.
- Or scans the **QR code** → opens the file link on mobile.

## Example Use Cases
- Hosting a QR PNG file for download.
- Providing quick access to media files via QR code.
- Programmatically generating QR codes via the API.