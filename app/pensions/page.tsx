import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const prix = [
  { service: "Pension en groupe avec abris naturel", prix: "230€" },
  { service: "Pension en groupe avec abris en dur", prix: "250€" },
  { service: "Pension à 2 avec abris en dur individuel", prix: "265€" },
];

export default function PensionsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Pension Complète pour Chevaux et Poneys
      </h1>

      <div className="max-w-6xl mx-auto">
        <section className="flex flex-col md:flex-row items-center mb-16 bg-[--var(--deep-burgundy)] rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4 ">
              Notre Engagement pour le Bien-être Équin
            </h2>
            <p className="mb-4 leading-relaxed">
              Au Poney club Desportis, nous nous engageons à offrir un
              environnement optimal pour le bien-être et l'épanouissement de vos
              chevaux et poneys. Notre approche holistique combine des
              installations modernes, des soins attentifs et une alimentation de
              qualité supérieure.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/pensions/box.jpg"
              alt="Nos paddocks spacieux"
              width={600}
              height={400}
              className="object-cover h-full w-full"
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center mb-16 bg-[--var(--deep-burgundy)] rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4 ">
              Des Espaces Vastes et Naturels
            </h2>
            <p className="mb-4 leading-relaxed">
              Nos pensionnaires profitent de vastes prairies verdoyantes et de
              paddocks spacieux, leur permettant de se mouvoir librement et de
              satisfaire leurs besoins naturels. Chaque espace est soigneusement
              entretenu pour garantir sécurité et confort optimal à nos équidés.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/pensions/parcs.jpg"
              alt="Nos prairies verdoyantes"
              width={600}
              height={400}
              className="object-cover h-full w-full"
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center mb-16 bg-[--var(--deep-burgundy)] rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4 ">
              Une Alimentation de Première Qualité
            </h2>
            <p className="mb-4 leading-relaxed">
              Nous accordons une importance capitale à l'alimentation de nos
              pensionnaires. Notre foin de haute qualité, produit localement,
              est complété par une gamme de concentrés adaptés aux besoins
              spécifiques de chaque équidé. Des compléments alimentaires sont
              disponibles sur recommandation vétérinaire pour assurer une santé
              optimale.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/pensions/hay.jpg"
              alt="Alimentation de qualité"
              width={600}
              height={400}
              className="object-cover h-full w-full"
            />
          </div>
        </section>

        <section className="bg-[--var(--deep-burgundy)] rounded-lg shadow-lg overflow-hidden p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4 ">
            Des Soins Attentifs et Professionnels
          </h2>
          <p className="mb-4 leading-relaxed">
            Notre équipe qualifiée assure des soins quotidiens minutieux,
            incluant le pansage, la surveillance de la santé, et des contrôles
            vétérinaires réguliers. Nous offrons également des services de
            maréchalerie et d'ostéopathie équine sur place pour garantir le
            bien-être complet de votre compagnon.
          </p>
        </section>

        <section className="bg-[--var(--deep-burgundy)] rounded-lg overflow-hidden p-8">
          <h2 className="text-2xl font-bold mb-4 ">Nos Tarifs</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Prix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prix.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-green-50 transition-colors duration-200"
                >
                  <TableCell>{item.service}</TableCell>
                  <TableCell>{item.prix}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
}
