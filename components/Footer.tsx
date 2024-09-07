import { Mail, Phone } from "lucide-react";
import Link from "next/link";

const FacebookIcon = ({ size = 32 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 32 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[var(--deep-burgundy)] text-[var(--ivory)] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Poney Club Desportis</h2>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <Link
                href="https://www.facebook.com/p/Poney-Club-Desportis-100027924560857/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--vivid-burgundy)] transition-colors"
              >
                <FacebookIcon size={32} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/poneyclubdesportis/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--vivid-burgundy)] transition-colors"
              >
                <InstagramIcon size={32} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-2">
              <Phone size={18} className="mr-2" />
              <Link href="tel:+33642878958" className="hover:underline">
                +33 6 42 87 89 58
              </Link>
            </div>
            <div className="flex items-center">
              <Mail size={18} className="mr-2" />
              <Link
                href="mailto:poneyclub.desportis@free.fr"
                className="hover:underline"
              >
                poneyclub.desportis@free.fr
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Poney Club Desportis. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
