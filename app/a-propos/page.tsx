"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaHorse, FaChild, FaHome, FaTools, FaHandshake } from "react-icons/fa";
import { MdForest } from "react-icons/md";

export default function AProposPage() {
  const diplomas = [
    {
      title: "BPJEPS activité équestre Béatrice Bürkle",
      url: "/a-propos/BPJEPS_BB.jpg",
    },
    {
      title: "BPJEPS activité équestre Clémence Médail",
      url: "/a-propos/BPJEPS_AE_A_CM.jpg",
    },
    { title: "BFEEH Béatrice Bürkle", url: "/a-propos/BFEEH_BB.jpg" },
    { title: "BFEE2 Béatrice Bürkle", url: "/a-propos/BFEE2_BB.jpg" },
  ];

  const evenements = [
    {
      annee: 2008,
      titre: "Fondation du Poney Club Desportis",
      description:
        "Début de notre aventure avec une passion pour l'équitation et le bien-être des poneys. Notre club a ouvert ses portes avec 4 petits poneys shetlands (Coco, Elite, Malabar, Cookie) pour les cours enfants.",
      icon: <FaHorse />,
    },
    {
      annee: 2009,
      titre: "Lancement des cours pour adolescents",
      description:
        "Locations et achats de grands poneys pour initier les cavaliers adolescents à l'équitation.",
      icon: <FaChild />,
    },
    {
      annee: 2010,
      titre: "Création des services de pension",
      description:
        "Ouverture de notre service de pension complète, offrant des soins de qualité supérieure à nos pensionnaires.",
      icon: <FaHome />,
    },
    {
      annee: 2014,
      titre: "Amélioration de nos installations",
      description:
        "Rénovation de nos écuries avec l'installation d'un rond de longe, une centralisation des activités autour du poney (sellerie, parcs, etc)",
      icon: <FaTools />,
    },
    {
      annee: 2016,
      titre: "Extension de la promenade",
      description:
        "Agrandissement des promenades internes en forêt. Aménagement des clotûres pour la sécurité et le fléchage des cavaliers.",
      icon: <MdForest />,
    },
    {
      annee: 2017,
      titre: "Création d'un terrain de cross",
      description:
        "Inauguration d'un terrain comprenant une bute, un contre-haut, contre-bas, troncs d'arbre de différentes taille et une haie.",
      icon: <MdForest />,
    },
    {
      annee: 2020,
      titre: "Collaboration avec une monitrice d'équitation",
      description:
        "Embauche de Clémence Médail pour un service civique suivi d'un contrat d'apprentissage animateur poney et aide à sa formation de monitrice d'équitation.",
      icon: <FaHandshake />,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-[var(--ivory)]">
      <h1 className="text-4xl font-bold mb-8 text-center text-[var(--deep-burgundy)]">
        Présentation du Poney Club Desportis
      </h1>

      <div className="w-full mb-12">
        <div className="relative mb-12 mx-auto max-h-[70vh] overflow-hidden rounded-lg shadow-lg aspect-[16/9]">
          <Image
            src="/a-propos/poney-club.jpg"
            alt="Installations Poney Club Desportis"
            fill
            className="object-cover object-center rounded-lg"
          />
        </div>
        <div className="text-lg max-w-4xl mx-auto px-4">
          <p className="mb-4">
            Depuis 2008, le Poney Club Desportis s'engage à offrir une
            expérience équestre exceptionnelle au cœur de la campagne
            vauclusienne, alliant passion, respect des animaux et expertise.
          </p>
          <p className="mb-4">
            Nous proposons une variété de services pour répondre aux besoins de
            tous les cavaliers :
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Des cours d'équitation pour enfants et adultes, adaptés à tous les
              niveaux
            </li>
            <li>Des stages pendant les vacances scolaires</li>
            <li>Des services de pension complète et demi-pension</li>
            <li>Des balades guidées dans le domaine</li>
          </ul>
          <p className="mb-4">
            Nos installations comprennent une grande carrière de sable de 60m x
            30m, un rond de longe de 18m, un parcours de cross, une douche fixe,
            ainsi que de nombreux chemins de balades offrant un cadre naturel et
            sécurisé pour vos sorties.
          </p>
          <p className="mb-4">
            Le bien-être de nos animaux est notre priorité absolue. Nous leur
            offrons les meilleurs soins tout au long de leur vie, y compris une
            retraite paisible lorsqu'ils ne sont plus en activité. Notre foin,
            produit proche du club et de très haute qualité, garantit une
            alimentation saine et adaptée à leurs besoins.
          </p>
          <p>
            Avec des années d'expérience et un cadre idéal, le Poney Club
            Desportis est le choix de confiance pour tous les passionnés
            d'équitation, qu'ils soient débutants ou confirmés.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 my-12">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[var(--deep-burgundy)]">
          Nos Diplômes et Certifications
        </h2>
        <p className="text-lg mb-4">
          Au Poney Club Desportis, nous sommes fiers de nos accomplissements et
          de la qualité de notre enseignement. Voici nos diplômes et
          certifications :
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
          Règlement Intérieur
        </h2>
        <p className="text-lg">
          Pour assurer le bon fonctionnement de notre club et la sécurité de
          tous, nous vous invitons à consulter notre{" "}
          <Link
            href="/a-propos/reglement_interieur.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--deep-burgundy)] hover:underline"
          >
            règlement intérieur
          </Link>
          . Ce document détaille les règles et procédures à suivre au sein de
          notre établissement.
        </p>
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

      <div className="max-w-4xl mx-auto px-4 my-16">
        <h2 className="text-3xl font-semibold mb-12 text-center text-[var(--deep-burgundy)]">
          Notre Partenaire Officiel
        </h2>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src="/a-propos/ford.jpg"
                alt="Ford - Notre partenaire officiel"
                width={640}
                height={427}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-[var(--deep-burgundy)] font-semibold">
                Ford Pertuis
              </div>
              <p className="mt-2 text-gray-500">
                Partenaire du Poney Club Desportis depuis 2011
              </p>
              <div className="mt-4">
                <p className="text-gray-600">79 Rue Denis Papin</p>
                <p className="text-gray-600">84120 Pertuis</p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Tél :</span> 04 90 09 73 33
                </p>
              </div>
              <a
                href="tel:+33490097333"
                className="mt-4 inline-block bg-[var(--deep-burgundy)] text-white py-2 px-4 rounded hover:bg-[var(--vivid-burgundy)] transition duration-300"
              >
                Contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
