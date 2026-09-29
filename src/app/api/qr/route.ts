import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

interface QRRequestBody {
  text: string;
  size?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  format?: "png" | "svg" | "base64";
  margin?: number;
}

/**
 * GET /api/qr?text=https://example.com
 *
 * Query Parameters:
 *  - text (required): The text/URL to encode
 *  - size: Image width in pixels (default: 400)
 *  - fg: Foreground color hex without # (default: 000000)
 *  - bg: Background color hex without # (default: FFFFFF)
 *  - ecl: Error correction level - L, M, Q, H (default: H)
 *  - format: Output format - png, svg, base64 (default: png)
 *  - margin: Quiet zone size in modules (default: 2)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  if (!text) {
    return NextResponse.json(
      { error: "Missing required parameter: text" },
      { status: 400 }
    );
  }

  const size = parseInt(searchParams.get("size") || "400", 10);
  const fg = `#${searchParams.get("fg") || "000000"}`;
  const bg = `#${searchParams.get("bg") || "FFFFFF"}`;
  const ecl = (searchParams.get("ecl") || "H") as "L" | "M" | "Q" | "H";
  const format = (searchParams.get("format") || "png") as "png" | "svg" | "base64";
  const margin = parseInt(searchParams.get("margin") || "2", 10);

  return generateQR({ text, size, foregroundColor: fg, backgroundColor: bg, errorCorrectionLevel: ecl, format, margin });
}

/**
 * POST /api/qr
 *
 * Body (JSON):
 * {
 *   "text": "https://example.com",   // required
 *   "size": 400,                      // optional, default 400
 *   "foregroundColor": "#000000",     // optional
 *   "backgroundColor": "#FFFFFF",     // optional
 *   "errorCorrectionLevel": "H",     // optional, L | M | Q | H
 *   "format": "png",                 // optional, png | svg | base64
 *   "margin": 2                      // optional, quiet zone modules
 * }
 */
export async function POST(request: NextRequest) {
  let body: QRRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!body.text) {
    return NextResponse.json(
      { error: "Missing required field: text" },
      { status: 400 }
    );
  }

  return generateQR({
    text: body.text,
    size: body.size || 400,
    foregroundColor: body.foregroundColor || "#000000",
    backgroundColor: body.backgroundColor || "#FFFFFF",
    errorCorrectionLevel: body.errorCorrectionLevel || "H",
    format: body.format || "png",
    margin: body.margin ?? 2,
  });
}

async function generateQR(params: {
  text: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  format: "png" | "svg" | "base64";
  margin: number;
}) {
  const { text, size, foregroundColor, backgroundColor, errorCorrectionLevel, format, margin } = params;

  // Validate size
  if (size < 50 || size > 2000) {
    return NextResponse.json(
      { error: "Size must be between 50 and 2000 pixels" },
      { status: 400 }
    );
  }

  // Validate color format
  const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
  if (!hexColorRegex.test(foregroundColor) || !hexColorRegex.test(backgroundColor)) {
    return NextResponse.json(
      { error: "Colors must be valid hex format (e.g. #000000)" },
      { status: 400 }
    );
  }

  const qrOptions = {
    errorCorrectionLevel,
    margin,
    width: size,
    color: {
      dark: foregroundColor,
      light: backgroundColor,
    },
  };

  try {
    // --- SVG format ---
    if (format === "svg") {
      const svgString = await QRCode.toString(text, {
        ...qrOptions,
        type: "svg",
      });

      return new NextResponse(svgString, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }

    // --- Base64 format ---
    if (format === "base64") {
      const dataUrl = await QRCode.toDataURL(text, qrOptions);
      return NextResponse.json(
        {
          dataUrl,
          text,
          size,
          format: "base64",
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        }
      );
    }

    // --- PNG format (default) ---
    const buffer = await QRCode.toBuffer(text, {
      ...qrOptions,
      type: "png",
    });

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="qrcode.png"`,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("QR code generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
