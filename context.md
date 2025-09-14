# Next.js QR Download Page – Context

## Overview
This project is a **minimal one-page Next.js website** that provides users with:
- A **QR code** to scan and download a file.
- A **direct download button** for the same file.
- A **preview section** for generating a QR code.

No authentication, no admin panel — just a clean static page.

## Features
- Built with **Next.js** for fast and SEO-friendly rendering.
- **Single page** with download button + QR code.
- **Responsive design** (works on both desktop and mobile).
- **File preview section** (generated a QR code preview).
- Deployable on **Vercel** or any Node.js host.

## Tech Stack
- **Frontend:** Next.js (React, TailwindCSS for styling)
- **QR Code Generation:** `qrcode.react` NPM package
- **Hosting:** Vercel (recommended)

## Page Structure
1. **Header / Title** → Name of the file or app.
2. **Preview Section** → generated a QR code preview.
3. **Download Button** → Direct link to the file to download that qr png file.

## Example Flow
- User visits the page.
- Sees file preview (generated a QR code preview).
- Clicks the **Download button** → qr png file starts downloading.
- Or scans the **QR code** → opens the file link on mobile.

## Example Use Cases
- Hosting a qr png file for download.
- Providing quick access to media files via QR code.