# ResponsiveImage Component

A wrapper around Next.js Image component that provides optimized defaults for responsive images.

## Features

- **Automatic responsive sizing**: Default sizes prop optimized for mobile, tablet, and desktop
- **Blur placeholders**: Smooth loading transitions with blur effect
- **Priority loading**: Support for above-fold images to improve LCP
- **Flexible positioning**: Custom objectFit and objectPosition support
- **Type-safe**: Full TypeScript support with proper types

## Usage

### Basic Usage

```tsx
import ResponsiveImage from "@/components/ResponsiveImage";

<ResponsiveImage
  src="/hero-image.jpg"
  alt="Poney Club Desportis"
  fill
  priority
/>
```

### With Custom Sizes

```tsx
<ResponsiveImage
  src="/animal.jpg"
  alt="Horse name"
  width={300}
  height={400}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
/>
```

### With Custom Object Fit and Position

```tsx
<ResponsiveImage
  src="/hero-image.jpg"
  alt="Hero image"
  fill
  objectFit="cover"
  objectPosition="63% center"
  priority
/>
```

### With Custom Blur Placeholder

```tsx
<ResponsiveImage
  src="/photo.jpg"
  alt="Photo description"
  width={800}
  height={600}
  blurDataURL="/photo-blur.jpg"
/>
```

### Without Blur Placeholder

```tsx
<ResponsiveImage
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  placeholder="empty"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | Image source URL |
| `alt` | `string` | Required | Alt text for accessibility |
| `priority` | `boolean` | `false` | Load image with priority (for above-fold images) |
| `sizes` | `string` | `"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` | Responsive sizes attribute |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | How image fits in container |
| `objectPosition` | `string` | `'center'` | Position of image in container |
| `className` | `string` | `""` | Additional CSS classes |
| `blurDataURL` | `string` | `undefined` | Custom blur placeholder URL |
| `placeholder` | `'blur' \| 'empty'` | `'blur'` | Whether to use blur placeholder |

All other Next.js Image props are also supported (width, height, fill, quality, etc.)

## Requirements Satisfied

- **1.5**: Optimized focal points for mobile vs desktop
- **1.8**: Appropriately sized images for device resolution
- **6.5**: Next.js Image optimization with appropriate formats
- **6.6**: Lazy loading for below-fold images (via priority prop)

## Examples in Codebase

### Hero Section (Above-fold, priority)

```tsx
<ResponsiveImage
  src="/hero-image.jpg"
  alt="Poney Club Desportis"
  fill
  objectPosition="63% center"
  priority
  blurDataURL="/hero-image-blur.jpg"
/>
```

### Animal Cards (Below-fold, lazy loaded)

```tsx
<ResponsiveImage
  src={animal.image}
  alt={animal.name}
  width={300}
  height={400}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
  blurDataURL="/blurred.avif"
/>
```

### Event Images (Responsive grid)

```tsx
<ResponsiveImage
  src={event.image}
  alt={event.title}
  width={600}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```
