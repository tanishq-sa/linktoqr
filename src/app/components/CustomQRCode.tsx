"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface CustomQRCodeProps {
  value: string;
  size?: number;
  logoUrl?: string;
  logoSize?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  className?: string;
}

export default function CustomQRCode({
  value,
  size = 280,
  logoUrl,
  logoSize = 60,
  backgroundColor = "#FFFFFF",
  foregroundColor = "#000000",
  className = "",
}: CustomQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);

  // Load logo image
  useEffect(() => {
    if (logoUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setLogoImage(img);
      img.onerror = () => setLogoImage(null);
      img.src = logoUrl;
    } else {
      setLogoImage(null);
    }
  }, [logoUrl]);

  // Generate QR code with custom styling
  useEffect(() => {
    const generateCustomQR = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size with scale factor for crisp rendering on high-DPI/Retina screens and downloads
      const scale = 4;
      canvas.width = size * scale;
      canvas.height = size * scale;

      // Scale the context so drawing operations can use the standard logical size
      ctx.scale(scale, scale);

      try {
        // Generate QR code data
        const qrData = await QRCode.create(value, {
          errorCorrectionLevel: 'H', // Higher error correction for logo support
        });

        const modules = qrData.modules;
        const moduleCount = modules.size;
        const moduleSize = size / (moduleCount + 2); // Add margin

        // Clear canvas with white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);

        // Draw QR code modules as rounded squares with gaps
        ctx.fillStyle = foregroundColor;
        
        // Add gap between modules
        const gap = 1; // 1 pixel gap
        
        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            if (modules.get(row, col)) {
              const x = (col + 1) * moduleSize + gap / 2;
              const y = (row + 1) * moduleSize + gap / 2;
              const moduleWidth = moduleSize - gap;
              const moduleHeight = moduleSize - gap;
              
              // Draw rounded rectangle with high radius for circular appearance
              const radius = Math.min(moduleWidth * 0.4, moduleHeight * 0.4);
              
              ctx.beginPath();
              ctx.moveTo(x + radius, y);
              ctx.lineTo(x + moduleWidth - radius, y);
              ctx.quadraticCurveTo(x + moduleWidth, y, x + moduleWidth, y + radius);
              ctx.lineTo(x + moduleWidth, y + moduleHeight - radius);
              ctx.quadraticCurveTo(x + moduleWidth, y + moduleHeight, x + moduleWidth - radius, y + moduleHeight);
              ctx.lineTo(x + radius, y + moduleHeight);
              ctx.quadraticCurveTo(x, y + moduleHeight, x, y + moduleHeight - radius);
              ctx.lineTo(x, y + radius);
              ctx.quadraticCurveTo(x, y, x + radius, y);
              ctx.closePath();
              ctx.fill();
            }
          }
        }

        // Draw logo in center if provided
        if (logoImage) {
          const centerX = size / 2;
          const centerY = size / 2;
          const logoX = centerX - logoSize / 2;
          const logoY = centerY - logoSize / 2;

          // Draw white background circle for logo with border
          ctx.fillStyle = backgroundColor;
          ctx.beginPath();
          ctx.arc(centerX, centerY, logoSize / 2 + 6, 0, 2 * Math.PI);
          ctx.fill();
          
          // Add a subtle border
          ctx.strokeStyle = foregroundColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(centerX, centerY, logoSize / 2 + 6, 0, 2 * Math.PI);
          ctx.stroke();

          // Draw logo with rounded corners
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, logoSize / 2, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
          ctx.restore();
        }

      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateCustomQR();
  }, [value, size, logoImage, logoSize, backgroundColor, foregroundColor]);


  return (
    <div className={`inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
