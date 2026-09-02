/**
 * Self-check for the upload sniffer. The bytes an admin uploads decide the
 * Content-Type we later serve, so a wrong answer here is a security bug, not a
 * cosmetic one. No test runner: run it with
 *
 *   node --experimental-strip-types scripts/check-image-type.ts
 */
import assert from "node:assert/strict";
import { sniffImageMime, readImageSize } from "../src/lib/image-type.ts";

/** Minimal PNG: signature + IHDR with width/height at byte 16 and 20. */
function png(width: number, height: number): Uint8Array {
  const b = new Uint8Array(24);
  b.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  b.set([0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52], 8);
  new DataView(b.buffer).setUint32(16, width);
  new DataView(b.buffer).setUint32(20, height);
  return b;
}

/** Minimal GIF: "GIF89a" + little-endian logical screen size. */
function gif(width: number, height: number): Uint8Array {
  const b = new Uint8Array(10);
  b.set([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
  const v = new DataView(b.buffer);
  v.setUint16(6, width, true);
  v.setUint16(8, height, true);
  return b;
}

/** SOI, then a JFIF APP0 the walker must step over, then the SOF0 frame. */
function jpeg(width: number, height: number): Uint8Array {
  const app0 = [0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0];
  const sof = [0xff, 0xc0, 0x00, 0x11, 0x08];
  const b = new Uint8Array(2 + app0.length + sof.length + 4 + 6);
  b.set([0xff, 0xd8]);
  b.set(app0, 2);
  b.set(sof, 2 + app0.length);
  const at = 2 + app0.length + sof.length;
  const v = new DataView(b.buffer);
  v.setUint16(at, height);
  v.setUint16(at + 2, width);
  return b;
}

function webp(): Uint8Array {
  const b = new Uint8Array(16);
  b.set([0x52, 0x49, 0x46, 0x46]);            // RIFF
  b.set([0x57, 0x45, 0x42, 0x50], 8);         // WEBP
  return b;
}

function avif(): Uint8Array {
  const b = new Uint8Array(16);
  b.set([0x66, 0x74, 0x79, 0x70], 4);         // ftyp
  b.set([0x61, 0x76, 0x69, 0x66], 8);         // avif
  return b;
}

// Accepts every supported format.
assert.equal(sniffImageMime(png(800, 600)), "image/png");
assert.equal(sniffImageMime(gif(4, 5)), "image/gif");
assert.equal(sniffImageMime(jpeg(1920, 1080)), "image/jpeg");
assert.equal(sniffImageMime(webp()), "image/webp");
assert.equal(sniffImageMime(avif()), "image/avif");

// Rejects everything else — a lying Content-Type must not get through.
assert.equal(sniffImageMime(new TextEncoder().encode("<svg xmlns='...'><script/></svg>")), null);
assert.equal(sniffImageMime(new TextEncoder().encode("GIF")), null, "truncated header");
assert.equal(sniffImageMime(new TextEncoder().encode("%PDF-1.7")), null);
assert.equal(sniffImageMime(new Uint8Array(0)), null);
// RIFF container that is not WebP (e.g. a WAV) must not pass as an image.
const wav = new Uint8Array(16);
wav.set([0x52, 0x49, 0x46, 0x46]);
wav.set([0x57, 0x41, 0x56, 0x45], 8);
assert.equal(sniffImageMime(wav), null);

// Dimensions, including the JPEG marker walk past APP0.
assert.deepEqual(readImageSize(png(800, 600), "image/png"), { width: 800, height: 600 });
assert.deepEqual(readImageSize(gif(4, 5), "image/gif"), { width: 4, height: 5 });
assert.deepEqual(readImageSize(jpeg(1920, 1080), "image/jpeg"), { width: 1920, height: 1080 });
// Unparsed formats report no size rather than a wrong one.
assert.equal(readImageSize(webp(), "image/webp"), null);

console.log("image-type: all checks passed");
