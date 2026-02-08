import ResponsiveImage from "@/components/ResponsiveImage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from 'next-intl';

export default function PensionsPage() {
  const t = useTranslations('pensions');
  
  const prix = [
    { service: t('services.groupNatural'), prix: "240€" },
    { service: t('services.groupBuilt'), prix: "260€" },
    { service: t('services.individual'), prix: "300€" },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">
        {t('title')}
      </h1>

      <div className="max-w-6xl mx-auto">
        <section className="flex flex-col md:flex-row items-center mb-16 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">
              {t('wellbeing')}
            </h2>
            <p className="mb-4 leading-relaxed">
              {t('wellbeingText')}
            </p>
          </div>
          <div className="md:w-1/2">
            <ResponsiveImage
              src="/pensions/box.jpg"
              alt={t('imageAlt.box')}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              objectFit="cover"
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center mb-16 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">
              {t('spaces')}
            </h2>
            <p className="mb-4 leading-relaxed">
              {t('spacesText')}
            </p>
          </div>
          <div className="md:w-1/2">
            <ResponsiveImage
              src="/pensions/parcs.jpg"
              alt={t('imageAlt.parcs')}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              objectFit="cover"
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center mb-16 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">
              {t('food')}
            </h2>
            <p className="mb-4 leading-relaxed">
              {t('foodText')}
            </p>
          </div>
          <div className="md:w-1/2">
            <ResponsiveImage
              src="/pensions/hay.jpg"
              alt={t('imageAlt.hay')}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              objectFit="cover"
            />
          </div>
        </section>

        <section className="bg-white rounded-lg py-8">
          <h2 className="text-2xl font-bold mb-4 pl-8">
            {t('pricing')}
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('service')}</TableHead>
                  <TableHead>{t('pricePerMonth')}</TableHead>
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
