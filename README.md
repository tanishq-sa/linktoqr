# QR Code Download Page

A modern, responsive Next.js application for generating and downloading QR codes. Perfect for sharing files, links, and other content via QR codes.

## ✨ Features

- **🎨 Modern UI Design** - Clean, professional interface with Roboto Flex typography
- **📱 Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- **⚡ Real-time QR Generation** - QR code updates instantly as you type
- **🔵 Custom QR Styling** - Rounded modules with gaps for modern appearance
- **🖼️ Logo Integration** - Add custom logos to QR code center
- **📥 PNG Download** - Download high-quality QR codes as PNG files
- **🎯 Customizable** - Edit file names and URLs dynamically
- **🌙 Dark Mode Support** - Automatic dark/light theme switching
- **♿ Accessible** - Proper focus states and semantic HTML

## 🚀 Live Demo

[View Live Demo on Vercel](https://linktoqr.vercel.app)

## 🛠️ Tech Stack

- **Frontend:** Next.js 15.5.3
- **Styling:** TailwindCSS 4.0
- **QR Generation:** qrcode (with custom rounded modules)
- **Language:** TypeScript
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanishq-sa/linktoqrwebsite.git
   cd linktoqrwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Enter a file name** in the "File Name" field
2. **Add your download URL** in the "Download URL" field
3. **Upload a logo** (optional) to appear in the QR code center
4. **View the QR code** that updates in real-time with custom styling
5. **Click "Download QR Code"** to save as PNG file
6. **Scan the QR code** with any mobile device

## 📱 Features in Detail

### QR Code Generation
- Generates QR codes using the `qrcode` library with custom Canvas rendering
- Real-time updates as you type
- Custom rounded modules with gaps for modern appearance
- High error correction for logo support
- Optimized for mobile scanning

### Logo Integration
- Upload any image to appear in QR code center
- Circular logo with white background and border
- Real-time preview of logo in QR code
- Maintains QR code scannability

### PNG Download
- Downloads actual PNG files (not just text)
- High resolution (280x280 pixels)
- Custom filename based on input
- Proper error handling

### Modern UI
- Clean, professional design with Roboto Flex typography
- Solid colors and clean layouts
- Responsive grid layout
- Accessible form controls

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Update DNS settings

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify** - Connect GitHub repo
- **Railway** - Deploy directly from GitHub
- **AWS Amplify** - Connect repository
- **DigitalOcean App Platform** - Deploy from GitHub

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- **Colors:** Modify TailwindCSS classes in `src/app/page.tsx`
- **QR Settings:** Adjust QR code options in `src/app/components/CustomQRCode.tsx`
- **Font:** Change font in `src/app/globals.css` (update `--font-primary` variable)
- **Styling:** Update `src/app/globals.css` for custom styles

## 📄 Project Structure

```
linktoqrwebsite/
├── src/
│   └── app/
│       ├── components/
│       │   └── CustomQRCode.tsx  # Custom QR code component
│       ├── globals.css           # Global styles & fonts
│       ├── layout.tsx            # Root layout with font loading
│       └── page.tsx              # Main page component
├── public/                       # Static assets
├── package.json                  # Dependencies
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── postcss.config.mjs           # PostCSS configuration
└── README.md                    # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Developed by Tanishq Saini**
- [Next.js](https://nextjs.org/) for the amazing React framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS
- [qrcode](https://github.com/soldair/node-qrcode) for QR code generation
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ using Next.js and TailwindCSS**