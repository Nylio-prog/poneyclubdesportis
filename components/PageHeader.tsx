import Image, { type StaticImageData } from "next/image";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: StaticImageData;
  imageAlt?: string;
  /** CSS object-position for the banner image. */
  imagePosition?: string;
  /** Tailwind aspect ratio for the banner from the md breakpoint up. */
  imageAspect?: string;
}

/** Editorial page opening: eyebrow, large serif title, lead and an optional wide photo. */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  imagePosition = "center",
  imageAspect = "md:aspect-[21/9]",
}: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-7xl px-5 pt-14 md:px-10 md:pt-24">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="eyebrow text-wine">{eyebrow}</p>
          <h1 className="mt-5 text-5xl md:text-7xl">{title}</h1>
        </div>
        {lead && (
          <p className="text-lg leading-relaxed text-ink/70 md:col-span-4 md:pb-2">{lead}</p>
        )}
      </div>
      {image && (
        <div className={`relative mt-12 aspect-[4/3] overflow-hidden md:mt-16 ${imageAspect}`}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload
            placeholder="blur"
            quality={85}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </div>
      )}
    </header>
  );
}
