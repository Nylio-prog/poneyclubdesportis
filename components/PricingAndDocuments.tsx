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

const PricingAndDocuments: React.FC = () => {
  const pricingDocuments: PDFLinkProps[] = [
    { href: "/cours/tarifs.pdf", text: "Voir nos tarifs en PDF" },
    {
      href: "/cours/fiche_adhesion.pdf",
      text: "Voir notre fiche d'adhésion en PDF",
    },
  ];

  const licenseDocuments: PDFLinkProps[] = [
    {
      href: "/cours/ffe_autoquestionnaire_majeurs.pdf",
      text: "Voir l'auto-questionnaire FFE / attestation pour les majeurs en PDF",
    },
    {
      href: "/cours/ffe_autoquestionnaire_mineurs.pdf",
      text: "Voir l'auto-questionnaire FFE / attestation pour les mineurs en PDF",
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Nos tarifs et inscription</h2>
        {pricingDocuments.map((doc, index) => (
          <PDFLink key={index} {...doc} />
        ))}
      </section>

      <section className="py-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Licence et attestations médicales
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Documents d'auto-questionnaire
          </h3>
          {licenseDocuments.map((doc, index) => (
            <PDFLink key={index} {...doc} />
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Exigences médicales</h3>
          <p className="mb-4">
            Le cavalier souscrivant ou renouvelant une licence de pratiquant
            atteste avoir recueilli un avis médical favorable selon les
            modalités suivantes :
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
                  Première demande : Certificat médical de non
                  contre-indication.
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
        </div>

        <p className="text-sm text-gray-600 italic mt-6">
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
