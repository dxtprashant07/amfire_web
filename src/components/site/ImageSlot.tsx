/**
 * Replaces the design's <image-slot> authoring placeholder. Renders the image
 * once an admin sets a URL for it in the Content Manager; until then it shows
 * the same dashed empty state the design used.
 */
export function ImageSlot({ src, placeholder }: { src?: string; placeholder?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="img-slot-img" src={src} alt={placeholder || ""} />;
  }
  return (
    <div className="img-slot" role="img" aria-label={placeholder || "Image"}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
        <circle cx="9" cy="10" r="1.6"></circle>
        <path d="M3 17l5-5 4 4 4-3 5 4"></path>
      </svg>
      <span>{placeholder}</span>
    </div>
  );
}
