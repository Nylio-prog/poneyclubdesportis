import { Mail, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[var(--deep-burgundy)] text-[var(--ivory)] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Poney Club Desportis</h2>
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
          <p>&copy; {new Date().getFullYear()} Poney Club Desportis.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
