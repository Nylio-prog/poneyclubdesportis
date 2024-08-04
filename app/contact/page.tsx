export default function ContactPage() {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.038558399275!2d5.397516076655587!3d43.73052584742539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca1f4bcddefc0b%3A0x973c8086050cd94!2sPoney%20Club%20Desportis!5e0!3m2!1sfr!2sfr!4v1722784871710!5m2!1sfr!2sfr`;

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-12 text-center">Nos coordonnées</h1>
      <div className="max-w-4xl mx-auto bg-[--var(--deep-burgundy)] p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Adresse</h2>
          <p className="text-lg text-gray-600">
            1070, Chemin Vidau, 84160 Cadenet
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Téléphone
          </h2>
          <p className="text-lg text-gray-600">+33 6 42 87 89 58</p>
        </div>
        <div className="aspect-w-16 aspect-h-9 mb-8">
          <iframe
            src={mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="text-center">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--deep-burgundy)] text-[var(--ivory)] px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
