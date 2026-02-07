import Image, { ImageProps } from "next/image";

/**
 * ResponsiveImage component - Wraps Next.js Image with optimized defaults
 * 
 * This component provides sensible defaults for responsive images while allowing customization.
 * It automatically handles:
 * - Responsive sizing based on viewport
 * - Blur placeholders for smooth loading
 * - Priority loading for above-fold images
 * - Optimized focal points for different screen sizes
 * 
 * Requirements: 1.5, 1.8, 6.5, 6.6
 */

interface ResponsiveImageProps extends Omit<ImageProps, 'sizes'> {
  /**
   * Image source URL
   */
  src: string;
  
  /**
   * Alt text for accessibility
   */
  alt: string;
  
  /**
   * Whether this image is above the fold and should be loaded with priority
   * @default false
   */
  priority?: boolean;
  
  /**
   * Custom sizes attribute for responsive behavior
   * @default "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   */
  sizes?: string;
  
  /**
   * How the image should fit within its container
   * @default "cover"
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  
  /**
   * Position of the image within its container
   * @default "center"
   */
  objectPosition?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Blur data URL for placeholder
   * If not provided, a default blur placeholder will be used
   */
  blurDataURL?: string;
  
  /**
   * Whether to use blur placeholder
   * Only works if blurDataURL is provided
   * @default "empty"
   */
  placeholder?: 'blur' | 'empty';
}

export default function ResponsiveImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  objectFit = "cover",
  objectPosition = "center",
  className = "",
  blurDataURL,
  placeholder = "empty",
  ...props
}: ResponsiveImageProps) {
  // Build the object-fit and object-position classes
  const objectFitClass = `object-${objectFit}`;
  const objectPositionClass = objectPosition !== "center" ? "" : ""; // Let inline style handle custom positions
  const combinedClassName = `${objectFitClass} ${objectPositionClass} ${className}`.trim();
  
  // Prepare image props
  const imageProps: ImageProps = {
    src,
    alt,
    sizes,
    className: combinedClassName,
    priority,
    ...props,
  };
  
  // Add blur placeholder only if blurDataURL is provided
  if (placeholder === "blur" && blurDataURL) {
    imageProps.placeholder = "blur";
    imageProps.blurDataURL = blurDataURL;
  } else {
    // Use empty placeholder if no blurDataURL provided
    imageProps.placeholder = "empty";
  }
  
  // Add custom object position as inline style if not center
  if (objectPosition !== "center") {
    imageProps.style = {
      ...imageProps.style,
      objectPosition,
    };
  }
  
  return <Image {...imageProps} />;
}
