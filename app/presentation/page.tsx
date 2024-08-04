"use client";

import React from "react";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaHorse,
  FaChild,
  FaHome,
  FaTools,
  FaBirthdayCake,
} from "react-icons/fa";

export default function PresentationPage() {
  const evenements = [
    {
      annee: 2008,
      titre: "Fondation du Poney Club Desportis",
      description:
        "Début de notre aventure avec une passion pour l'équitation et le bien-être des poneys. Notre club a ouvert ses portes avec 5 poneys et une équipe dévouée de 3 personnes.",
      icon: <FaHorse />,
    },
    {
      annee: 2010,
      titre: "Lancement des cours pour enfants",
      description:
        "Introduction de programmes spécialement conçus pour initier les jeunes cavaliers à l'équitation. Nos cours 'Premiers Galops' sont devenus rapidement populaires, accueillant plus de 50 enfants par semaine.",
      icon: <FaChild />,
    },
    {
      annee: 2015,
      titre: "Expansion des services de pension",
      description:
        "Ouverture de notre service de pension complète, offrant des soins de qualité supérieure à nos pensionnaires. Nous avons construit 20 nouveaux boxes et embauché 2 palefreniers supplémentaires pour assurer un service optimal.",
      icon: <FaHome />,
    },
    {
      annee: 2020,
      titre: "Amélioration de nos installations",
      description:
        "Rénovation de nos écuries et agrandissement de nos paddocks pour le confort optimal de nos poneys. Nous avons également installé un nouveau manège couvert de 800m² pour permettre l'entraînement toute l'année.",
      icon: <FaTools />,
    },
    {
      annee: 2024,
      titre: "Célébration de notre 16ème anniversaire",
      description:
        "Fiers de nos années d'expérience et reconnaissants envers notre communauté équestre fidèle. Nous organisons une grande fête avec démonstrations, baptêmes poney et barbecue pour remercier tous nos membres et amis.",
      icon: <FaBirthdayCake />,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-[var(--ivory)]">
      <h1 className="text-4xl font-bold mb-8 text-center text-[var(--deep-burgundy)]">
        Présentation du Poney Club Desportis
      </h1>

      <div className="w-full mb-12">
        <div className="relative w-full h-[50vh] mb-8">
          <Image
            src="/presentation/poney-club.jpg"
            alt="Poney Club Desportis"
            fill
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg mb-4">
            Depuis 2008, le Poney Club Desportis s'engage à offrir une
            expérience équestre exceptionnelle au cœur de la campagne française.
            Notre passion pour les poneys et l'équitation nous pousse chaque
            jour à offrir le meilleur à nos cavaliers et nos équidés.
          </p>
          <p className="text-lg mb-4">
            Nous proposons une variété de services incluant :
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Des cours d'équitation pour enfants et adultes</li>
            <li>Des stages pendant les vacances scolaires</li>
            <li>Des services de pension complète</li>
            <li>Des balades en forêt guidées</li>
          </ul>
          <p className="text-lg">
            Notre foin de haute qualité, produit localement, et nos années
            d'expérience font de nous un choix de confiance pour les passionnés
            d'équitation de tous niveaux.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center text-[var(--deep-burgundy)]">
        Notre Histoire
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
    </div>
  );
}
