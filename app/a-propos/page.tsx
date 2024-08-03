"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function AProposPage() {
  const evenements = [
    {
      annee: 2008,
      titre: "Fondation du Poney Club Desportis",
      description:
        "Début de notre aventure avec une passion pour l'équitation et le bien-être des poneys.",
    },
    {
      annee: 2010,
      titre: "Lancement des cours pour enfants",
      description:
        "Introduction de programmes spécialement conçus pour initier les jeunes cavaliers à l'équitation.",
    },
    {
      annee: 2015,
      titre: "Expansion des services de pension",
      description:
        "Ouverture de notre service de pension complète, offrant des soins de qualité supérieure à nos pensionnaires.",
    },
    {
      annee: 2020,
      titre: "Amélioration de nos installations",
      description:
        "Rénovation de nos écuries et agrandissement de nos paddocks pour le confort optimal de nos poneys.",
    },
    {
      annee: 2024,
      titre: "Célébration de notre 16ème anniversaire",
      description:
        "Fiers de nos années d'expérience et reconnaissants envers notre communauté équestre fidèle.",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-[var(--ivory)]">
      <h1 className="text-4xl font-bold mb-8 text-center">À propos</h1>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        Depuis 2008, le Poney Club Desportis s'engage à offrir une expérience
        équestre exceptionnelle. Nous proposons des cours pour enfants, des
        services de pension complète, et assurons des soins attentifs à nos
        poneys. Notre foin de haute qualité et nos années d'expérience font de
        nous un choix de confiance pour les passionnés d'équitation.
      </p>
      <VerticalTimeline lineColor="var(--deep-burgundy)">
        {evenements.map((evenement, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--deep-burgundy)",
              color: "var(--ivory)",
            }}
            contentArrowStyle={{
              borderRight: "7px solid var(--deep-burgundy)",
            }}
            date={evenement.annee.toString()}
            iconStyle={{
              background: "var(--deep-burgundy)",
              color: "var(--ivory)",
            }}
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              {evenement.titre}
            </h3>
            <p>{evenement.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
