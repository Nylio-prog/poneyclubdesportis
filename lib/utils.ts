import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, locale: string = 'fr'): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const localeCode = locale === 'fr' ? 'fr-FR' : 'en-US';
  return new Date(dateString).toLocaleDateString(localeCode, options);
}

export function formatTime(timeString: string, locale: string = 'fr'): string {
  // timeString is in HH:mm format
  const [hours, minutes] = timeString.split(':').map(Number);
  
  if (locale === 'fr') {
    // 24-hour format for French
    return timeString;
  } else {
    // 12-hour format for English
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}
