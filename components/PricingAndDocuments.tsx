import Link from "next/link";

interface PDFLinkProps {
  href: string;
  text: string;
}

const PDFLink: React.FC<PDFLinkProps> = ({ href, text }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-bold text-[var(--deep-burgundy)] hover:underline block mb-2"
  >
    {text}
  </Link>
);

const PricingAndDocuments = () => {
  const documents = [
    { href: "/cours/tarifs.pdf", text: "Voir nos tarifs en PDF" },
    {
      href: "/cours/fiche_adhesion.pdf",
      text: "Voir notre fiche d'adhésion en PDF",
    },
    {
      href: "/cours/ffe_autoquestionnaire_majeurs.pdf",
      text: "Voir l'auto-questionnaire pour les majeurs en PDF",
    },
    {
      href: "/cours/ffe_autoquestionnaire_mineurs.pdf",
      text: "Voir l'auto-questionnaire pour les mineurs en PDF",
    },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Nos tarifs et documents</h2>
        {documents.map((doc, index) => (
          <PDFLink key={index} {...doc} />
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Attestations médicales</h2>
        <p className="mb-4">
          Le cavalier souscrivant ou renouvelant une licence de pratiquant
          atteste avoir recueilli un avis médical favorable selon les modalités
          suivantes :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Mineurs :</strong> Attestation de réponse négative à
            l'auto-questionnaire.
          </li>
          <li>
            <strong>Majeurs de moins de 40 ans :</strong>
            <ul className="list-circle pl-6 mt-1">
              <li>
                Première demande : Certificat médical de non contre-indication.
              </li>
              <li>
                Renouvellement : Attestation de réponse négative à
                l'auto-questionnaire.
              </li>
            </ul>
          </li>
          <li>
            <strong>Majeurs de 40 ans et plus :</strong>
            <ul className="list-circle pl-6 mt-1">
              <li>
                Première demande et tous les trois ans : Certificat médical de
                non contre-indication.
              </li>
              <li>
                Entre deux certificats : Attestation de réponse négative à
                l'auto-questionnaire.
              </li>
            </ul>
          </li>
        </ul>
        <p className="text-sm text-gray-600 italic mt-4">
          Source :{" "}
          <Link
            href="https://www.ffe.com/faq/La-licence"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--deep-burgundy)] hover:underline"
          >
            Fédération Française d'Equitation (FFE) - FAQ sur la licence
          </Link>
        </p>
      </section>
    </div>
  );
};

export default PricingAndDocuments;
