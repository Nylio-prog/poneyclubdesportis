"use client";

import ResponsiveImage from "@/components/ResponsiveImage";
import Link from "next/link";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaHorse, FaChild, FaHome, FaTools, FaHandshake } from "react-icons/fa";
import { MdForest } from "react-icons/md";
import { useTranslations } from 'next-intl';

// Note: Metadata is generated in a separate metadata file due to "use client" directive
// See app/[locale]/le-club/metadata.ts

export default function LeClubPage() {
  const t = useTranslations('leClub');
  
  const diplomas = [
    {
      title: t('diplomas.bpjepsBB'),
      url: "/le-club/BPJEPS_BB.jpg",
    },
    {
      title: t('diplomas.bpjepsCM'),
      url: "/le-club/BPJEPS_AE_A_CM.jpg",
    },
    { 
      title: t('diplomas.bfeehBB'), 
      url: "/le-club/BFEEH_BB.jpg" 
    },
    { 
      title: t('diplomas.bfee2BB'), 
      url: "/le-club/BFEE2_BB.jpg" 
    },
  ];

  const evenements = [
    {
      annee: 2008,
      titre: t('timeline.2008.title'),
      description: t('timeline.2008.description'),
      icon: <FaHorse />,
    },
    {
      annee: 2009,
      titre: t('timeline.2009.title'),
      description: t('timeline.2009.description'),
      icon: <FaChild />,
    },
    {
      annee: 2010,
      titre: t('timeline.2010.title'),
      description: t('timeline.2010.description'),
      icon: <FaHome />,
    },
    {
      annee: 2014,
      titre: t('timeline.2014.title'),
      description: t('timeline.2014.description'),
      icon: <FaTools />,
    },
    {
      annee: 2016,
      titre: t('timeline.2016.title'),
      description: t('timeline.2016.description'),
      icon: <MdForest />,
    },
    {
      annee: 2017,
      titre: t('timeline.2017.title'),
      description: t('timeline.2017.description'),
      icon: <MdForest />,
    },
    {
      annee: 2020,
      titre: t('timeline.2020.title'),
      description: t('timeline.2020.description'),
      icon: <FaHandshake />,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-[var(--ivory)]">
      <h1 className="text-4xl font-bold mb-8 text-center text-[var(--deep-burgundy)]">
        {t('title')}
      </h1>

      <div className="w-full mb-12">
        <div className="relative mb-12 mx-auto max-h-[70vh] overflow-hidden rounded-lg shadow-lg aspect-[16/9]">
          <ResponsiveImage
            src="/le-club/poney-club.jpg"
            alt={t('imageAlt')}
            fill
            sizes="100vw"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="text-lg max-w-4xl mx-auto px-4">
          <p className="mb-4">
            {t('intro1')}
          </p>
          <p className="mb-4">
            {t('intro2')}
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>{t('service1')}</li>
            <li>{t('service2')}</li>
            <li>{t('service3')}</li>
            <li>{t('service4')}</li>
          </ul>
          <p className="mb-4">
            {t('facilities')}
          </p>
          <p className="mb-4">
            {t('welfare')}
          </p>
          <p>
            {t('conclusion')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 my-12">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[var(--deep-burgundy)]">
          {t('diplomasTitle')}
        </h2>
        <p className="text-lg mb-4">
          {t('diplomasIntro')}
        </p>
        <ul className="text-lg list-disc list-inside mb-4">
          {diplomas.map((diploma, index) => (
            <li key={index}>
              <Link
                href={diploma.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--deep-burgundy)] hover:underline"
              >
                {diploma.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-12">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[var(--deep-burgundy)]">
          {t('rules')}
        </h2>
        <p className="text-lg">
          {t('rulesText')}{" "}
          <Link
            href="/le-club/reglement_interieur.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--deep-burgundy)] hover:underline"
          >
            {t('rulesLink')}
          </Link>
          {t('rulesText2')}
        </p>
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center text-[var(--deep-burgundy)]">
        {t('history')}
      </h2>

      <VerticalTimeline lineColor="var(--deep-burgundy)">
        {evenements.map((evenement, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--deep-burgundy)",
              color: "var(--ivory)",
              borderRadius: "15px",
              padding: "20px",
            }}
            contentArrowStyle={{
              borderRight: "7px solid var(--deep-burgundy)",
            }}
            iconStyle={{
              background: "var(--deep-burgundy)",
              color: "var(--ivory)",
            }}
            icon={evenement.icon}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="vertical-timeline-element-title text-xl font-bold">
                {evenement.titre}
              </h3>
              <span className="text-2xl font-bold">{evenement.annee}</span>
            </div>
            <p className="mt-2">{evenement.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      <div className="max-w-2xl mx-auto px-4 my-20">
        <h2 className="text-4xl font-bold mb-16 text-center text-[var(--deep-burgundy)] tracking-wide">
          {t('partner')}
        </h2>
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-10 text-center">
            <div className="mb-6">
              <div className="inline-block bg-gradient-to-r from-[var(--deep-burgundy)] to-[var(--vivid-burgundy)] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                {t('partnerName')}
              </div>
              <div className="text-lg text-gray-600 mt-3 font-medium">
                {t('partnerCity')}
              </div>
            </div>

            <div className=" rounded-xl p-4 mb-8">
              <p className="text-[var(--deep-burgundy)] font-semibold text-lg mb-2">
                {t('since')}
              </p>
              {/* <div className="w-20 h-1 bg-gradient-to-r from-[var(--deep-burgundy)] to-[var(--vivid-burgundy)] mx-auto rounded-full"></div> */}
            </div>

            <div className="space-y-2 mb-8 text-gray-700">
              <p className="text-lg font-medium">79 Rue Denis Papin</p>
              <p className="text-lg font-medium">84120 Pertuis</p>
              <p className="text-lg font-semibold text-[var(--deep-burgundy)] mt-4">
                <span className="inline-block mr-2">📞</span>
                04 90 09 73 33
              </p>
            </div>

            <a
              href="tel:+33490097333"
              className="inline-flex items-center bg-gradient-to-r from-[var(--deep-burgundy)] to-[var(--vivid-burgundy)] text-white py-3 px-8 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <span className="mr-2"></span>
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
