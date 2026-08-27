import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 * Combines clsx for conditional classes with tailwind-merge to avoid conflicts
 *
 * @example
 * cn('px-2 py-1', condition && 'px-4') // px-4 py-1 (not px-2 py-1)
 * cn('text-base', 'text-lg') // text-lg (properly merged)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
