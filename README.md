# QR Code Download Page

A modern, responsive Next.js application for generating and downloading QR codes. Perfect for sharing files, links, and other content via QR codes.

## ✨ Features

- **🎨 Modern UI Design** - Clean, professional interface with gradient backgrounds
- **📱 Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- **⚡ Real-time QR Generation** - QR code updates instantly as you type
- **📥 PNG Download** - Download high-quality QR codes as PNG files
- **🎯 Customizable** - Edit file names and URLs dynamically
- **🌙 Dark Mode Support** - Automatic dark/light theme switching
- **♿ Accessible** - Proper focus states and semantic HTML

## 🚀 Live Demo

[View Live Demo on Vercel](https://linktoqr.vercel.app)

## 🛠️ Tech Stack

- **Frontend:** Next.js 15.5.3
- **Styling:** TailwindCSS 4.0
- **QR Generation:** qrcode.react & qrcode
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
3. **View the QR code** that updates in real-time
4. **Click "Download QR Code"** to save as PNG file
5. **Scan the QR code** with any mobile device

## 📱 Features in Detail

### QR Code Generation
- Generates QR codes using the `qrcode.react` library
- Real-time updates as you type
- High-quality SVG rendering
- Optimized for mobile scanning

### PNG Download
- Downloads actual PNG files (not just text)
- High resolution (512x512 pixels)
- Custom filename based on input
- Proper error handling

### Modern UI
- Clean, professional design
- Gradient backgrounds and subtle animations
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
- **QR Settings:** Adjust QR code options in the `downloadFile` function
- **Styling:** Update `src/app/globals.css` for custom styles

## 📄 Project Structure

```
linktoqrwebsite/
├── src/
│   └── app/
│       ├── globals.css      # Global styles
│       ├── layout.tsx       # Root layout
│       └── page.tsx         # Main page component
├── public/                  # Static assets
├── package.json            # Dependencies
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # TailwindCSS configuration
└── README.md              # This file
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
- [qrcode.react](https://github.com/zpao/qrcode.react) for QR code generation
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ using Next.js and TailwindCSS**