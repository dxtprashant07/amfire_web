/**
 * Identifies an uploaded image from its leading bytes.
 *
 * The browser-supplied `File.type` is attacker-controlled, so it is never
 * trusted: the served Content-Type comes from this sniff instead. SVG is
 * deliberately absent — it can carry script, and these files are served from
 * the site's own origin.
 */
export type ImageMime = "image/png" | "image/jpeg" | "image/webp" | "image/gif" | "image/avif";

export const IMAGE_EXTENSIONS: Record<ImageMime, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

function startsWith(bytes: Uint8Array, sig: number[], offset = 0): boolean {
  if (bytes.length < offset + sig.length) return false;
  return sig.every((b, i) => bytes[offset + i] === b);
}

/** Returns the real image type, or null if the bytes are not a supported image. */
export function sniffImageMime(bytes: Uint8Array): ImageMime | null {
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "image/jpeg";
  if (startsWith(bytes, [0x47, 0x49, 0x46, 0x38])) return "image/gif";
  // RIFF....WEBP
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)) {
    return "image/webp";
  }
  // ISO-BMFF: ....ftyp + a brand. AVIF uses "avif" / "avis".
  if (startsWith(bytes, [0x66, 0x74, 0x79, 0x70], 4)) {
    const brand = String.fromCharCode(...bytes.slice(8, 12));
    if (brand === "avif" || brand === "avis") return "image/avif";
  }
  return null;
}

/**
 * Pixel dimensions, read from the header only — enough for PNG, JPEG and GIF,
 * which covers screenshots. Returns null when the format isn't parsed here;
 * dimensions are display metadata, not a validation gate.
 */
export function readImageSize(bytes: Uint8Array, mime: ImageMime): { width: number; height: number } | null {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  if (mime === "image/png" && bytes.length >= 24) {
    return { width: view.getUint32(16), height: view.getUint32(20) };
  }

  if (mime === "image/gif" && bytes.length >= 10) {
    return { width: view.getUint16(6, true), height: view.getUint16(8, true) };
  }

  if (mime === "image/jpeg") {
    // Walk the marker segments to the first SOF frame header.
    let i = 2;
    while (i + 9 < bytes.length) {
      if (bytes[i] !== 0xff) { i++; continue; }
      const marker = bytes[i + 1];
      // SOF0-SOF15, excluding DHT (c4), JPG (c8) and DAC (cc).
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: view.getUint16(i + 5), width: view.getUint16(i + 7) };
      }
      const segmentLength = view.getUint16(i + 2);
      if (segmentLength < 2) break;
      i += 2 + segmentLength;
    }
  }

  return null;
}
