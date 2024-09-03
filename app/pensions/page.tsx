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
        <section className="flex flex-col md:flex-row items-center mb-16 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">
              Un Engagement pour le Bien-être Équin
            </h2>
            <p className="mb-4 leading-relaxed">
              Au Poney Club Desportis, le bien-être de vos chevaux et poneys est
              notre identité. Nous mettons tout en œuvre pour offrir un cadre de
              vie serein et respectueux, où chaque équidé peut s'épanouir en
              toute tranquillité. Notre approche repose sur des soins attentifs,
              une alimentation équilibrée, et des installations de qualité, le
              tout encadré par une équipe de professionnels passionnés. Le club
              est géré par la monitrice
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

        <section className="flex flex-col md:flex-row-reverse items-center mb-16 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">
              Des Espaces Vastes et Naturels
            </h2>
            <p className="mb-4 leading-relaxed">
              Nos pensionnaires bénéficient de paddocks spacieux en petit groupe
              ou à deux, situés en colline hors des zones inondables. Ces
              espaces naturels leur permettent de se déplacer librement et de
              satisfaire leurs besoins naturels dans un environnement sécurisé
              et bien entretenu. De plus, les installations comme la carrière,
              le rond de longe, ou bien le cross permettront de s'épanouir avec
              son équidé dans la nature.
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

        <section className="flex flex-col md:flex-row items-center mb-16 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">
              Une Alimentation et des Soins de Qualité
            </h2>
            <p className="mb-4 leading-relaxed">
              L’alimentation est un pilier essentiel de la santé de nos équidés,
              c’est pourquoi nous fournissons un foin de haute qualité. Notre
              équipe expérimentée assure des soins quotidiens minutieux,
              incluant le pansage, la surveillance de la santé, et des contrôles
              vétérinaires réguliers. Pour le bien-être complet de vos
              compagnons, nous proposons également des services de maréchalerie
              et d'ostéopathie équine directement sur place, garantissant une
              prise en charge réactive et adaptée.
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

        <section className="bg-[--var(--deep-burgundy)] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 ">Nos Tarifs</h2>
          <div className="overflow-x-auto">
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
          </div>
        </section>
      </div>
    </div>
  );
}
