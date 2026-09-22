"use client";

import { useEffect, useState } from "react";

type Phase = {
  id: string;
  number: number;
  icon: string;
  title: string;
  description: string;
  status: "done" | "in_progress" | "todo";
  steps: string[];
  preCheckedCount?: number;
};

const phases: Phase[] = [
  {
    id: "analyse-modelisation",
    number: 1,
    icon: "🧠",
    title: "Analyse & Modélisation",
    description: "Définition du périmètre, acteurs, sécurité, données et flux métier d’AureLink.",
    status: "in_progress",
    steps: [
      "Définir le périmètre du MVP",
      "Définir les acteurs et rôles",
      "Définir les permissions",
      "Concevoir le fonctionnement multi-écoles",
      "Modéliser primaire et secondaire",
      "Définir la logique des notes",
      "Définir la logique des absences",
      "Définir les notifications",
      "Diagramme de cas d’utilisation",
      "Diagramme de classes",
      "Diagrammes de séquence",
    ],
    preCheckedCount: 2,
  },
  {
    id: "identite-design",
    number: 2,
    icon: "🎨",
    title: "Identité & Design",
    description: "Direction visuelle, charte graphique et maquettes de l’expérience utilisateur.",
    status: "todo",
    steps: [
      "Identité visuelle AureLink",
      "Character System",
      "Design System Figma",
      "Maquette authentification",
      "Maquettes Administration",
      "Maquettes Enseignant",
      "Maquettes Parent",
    ],
    preCheckedCount: 0,
  },
  {
    id: "initialisation-technique",
    number: 3,
    icon: "⚙️",
    title: "Initialisation technique",
    description: "Base technique, environnement de travail et plateforme de développement.",
    status: "todo",
    steps: [
      "Initialiser backend NestJS",
      "PostgreSQL + Prisma",
      "Initialiser Next.js",
      "Configuration environnement",
      "Git/GitHub",
      "CI/CD",
    ],
    preCheckedCount: 0,
  },
  {
    id: "authentification-securite",
    number: 4,
    icon: "🔐",
    title: "Authentification & Sécurité",
    description: "Flux de connexion, permissions, JWT et protection des accès par rôle et école.",
    status: "todo",
    steps: [
      "Login",
      "Logout",
      "JWT",
      "Refresh token",
      "Mot de passe oublié",
      "Activation compte",
      "Guards",
      "Permissions",
      "Isolation multi-écoles",
      "Tests sécurité",
    ],
    preCheckedCount: 0,
  },
  {
    id: "backend-administration",
    number: 5,
    icon: "🏫",
    title: "Backend — Administration",
    description: "Services API et cœur métier pour la gestion des établissements et utilisateurs.",
    status: "todo",
    steps: [
      "API établissements",
      "API utilisateurs",
      "API classes",
      "API matières",
      "API élèves",
      "API enseignants",
      "API parents",
      "API notes",
      "API moyennes",
      "API absences",
      "API notifications",
    ],
    preCheckedCount: 0,
  },
  {
    id: "notes-absences",
    number: 6,
    icon: "📊",
    title: "Notes & Absences",
    description: "Gestion des évaluations, calculs, suivi pédagogique et gestion des absences.",
    status: "todo",
    steps: [
      "Modèle de notes",
      "Saisie des évaluations",
      "Calcul des moyennes",
      "Vue enseignants",
      "Vue parents",
      "Suivi absences",
      "Justifications",
    ],
    preCheckedCount: 0,
  },
  {
    id: "interface-enseignant",
    number: 7,
    icon: "👨‍🏫",
    title: "Interface Enseignant",
    description: "Interfaces de suivi, classe, notes, absences et gestion pédagogique du quotidien.",
    status: "todo",
    steps: [
      "Dashboard",
      "Classes",
      "Élèves",
      "Notes",
      "Saisie notes",
      "Absences",
      "Notifications",
      "Profil",
    ],
    preCheckedCount: 0,
  },
  {
    id: "interface-parent",
    number: 8,
    icon: "👨‍👩‍👧",
    title: "Interface Parent",
    description: "Vue parent sur résultats, moyennes, absences et actualités scolaires.",
    status: "todo",
    steps: [
      "Dashboard",
      "Enfants",
      "Résultats",
      "Moyennes",
      "Absences",
      "Notifications",
      "Informations école",
      "Profil",
    ],
    preCheckedCount: 0,
  },
  {
    id: "administration-aurelink",
    number: 9,
    icon: "🛠️",
    title: "Administration AureLink",
    description: "Outils de gestion des écoles, établissements, rôles et paramètres du produit.",
    status: "todo",
    steps: [
      "Dashboard Super Admin",
      "Gestion établissements",
      "Gestion utilisateurs",
      "Gestion classes",
      "Gestion élèves",
      "Gestion enseignants",
      "Gestion parents",
      "Gestion matières",
      "Gestion années scolaires",
      "Gestion périodes",
      "Gestion paramètres",
    ],
    preCheckedCount: 0,
  },
  {
    id: "tests",
    number: 10,
    icon: "🧪",
    title: "Tests",
    description: "Validation fonctionnelle, sécurité, paramètres multi-écoles et responsive.",
    status: "todo",
    steps: [
      "Tests backend",
      "Tests authentification",
      "Tests permissions",
      "Tests multi-écoles",
      "Tests notes",
      "Tests moyennes",
      "Tests absences",
      "Tests fonctionnels",
      "Tests responsive",
    ],
    preCheckedCount: 0,
  },
  {
    id: "deploiement",
    number: 11,
    icon: "🚀",
    title: "Déploiement",
    description: "Préparation de la production, sécurité, environnement et mise en ligne.",
    status: "todo",
    steps: [
      "Domaine",
      "Frontend production",
      "Backend production",
      "PostgreSQL production",
      "Variables environnement",
      "HTTPS",
      "CORS",
      "Migrations",
      "Backup",
      "Monitoring",
    ],
    preCheckedCount: 0,
  },
  {
    id: "pilote-ecole",
    number: 12,
    icon: "🏫",
    title: "Pilote École",
    description: "Lancement en environnement réel avec un établissement de référence.",
    status: "todo",
    steps: [
      "Identifier école pilote",
      "Présentation",
      "Démonstration",
      "Configuration école",
      "Formation administrateur",
      "Ajout enseignants",
      "Ajout élèves",
      "Test réel",
      "Collecte feedback",
      "Corrections",
    ],
    preCheckedCount: 0,
  },
  {
    id: "release",
    number: 13,
    icon: "🎉",
    title: "Release",
    description: "Validation finale du MVP et préparation du lancement officiel d’AureLink.",
    status: "todo",
    steps: [
      "Fonctionnalités MVP terminées",
      "Tests validés",
      "Sécurité validée",
      "Multi-écoles validé",
      "Primaire validé",
      "Secondaire validé",
      "Responsive validé",
      "Production stable",
      "Documentation",
      "Release AureLink MVP v1.0",
    ],
    preCheckedCount: 0,
  },
];

const STORAGE_KEY = "aurelink-roadmap-mvp";

function buildInitialChecklistState() {
  return phases.reduce<Record<string, Record<string, boolean>>>((acc, phase) => {
    acc[phase.id] = phase.steps.reduce<Record<string, boolean>>((stepAcc, _, index) => {
      const isChecked = phase.preCheckedCount ? index < (phase.preCheckedCount ?? 0) : false;
      stepAcc[String(index)] = isChecked;
      return stepAcc;
    }, {});
    return acc;
  }, {});
}

export default function HomePage() {
  const [checklist, setChecklist] = useState<Record<string, Record<string, boolean>>>(() => {
    const initialChecklist = buildInitialChecklistState();

    if (typeof window === "undefined") {
      return initialChecklist;
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, Record<string, boolean>>) : initialChecklist;
    } catch {
      return initialChecklist;
    }
  });
  const [openPhase, setOpenPhase] = useState<string>("analyse-modelisation");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
    }
  }, [checklist]);

  const totalSteps = phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const totalChecked = phases.reduce((sum, phase) => {
    const state = checklist[phase.id] ?? {};
    return sum + Object.values(state).filter(Boolean).length;
  }, 0);

  const globalProgress = Math.round((totalChecked / totalSteps) * 100);

  const toggleStep = (phaseId: string, index: number) => {
    setChecklist((current) => ({
      ...current,
      [phaseId]: {
        ...(current[phaseId] ?? {}),
        [String(index)]: !(current[phaseId]?.[String(index)] ?? false),
      },
    }));
  };

  return (
    <main className="roadmap-page">
      <div className="roadmap-shell">
        <header className="topbar">
          <div>
            <p className="brand-mark">AURELINK</p>
            <h1>Roadmap MVP</h1>
          </div>
          <p className="subtitle">Le lien entre l&apos;école et la famille.</p>
        </header>

        <section className="overview-card">
          <div className="overview-copy">
            <p className="eyebrow">Progression du projet</p>
            <h2>{globalProgress}%</h2>
          </div>
          <div className="overview-progress">
            <div className="progress-bar large">
              <span style={{ width: `${globalProgress}%` }} />
            </div>
            <div className="overall-meta">
              <strong>{totalChecked} / {totalSteps} étapes validées</strong>
              <span>{globalProgress}% de progression</span>
            </div>
          </div>
        </section>

        <section className="phase-grid">
          {phases.map((phase) => {
            const phaseState = checklist[phase.id] ?? {};
            const checkedCount = Object.values(phaseState).filter(Boolean).length;
            const phaseProgress = Math.round((checkedCount / phase.steps.length) * 100);
            const isOpen = openPhase === phase.id;

            let label = "○ À FAIRE";
            let className = "status-pill todo";

            if (checkedCount === phase.steps.length) {
              label = "✓ TERMINÉ";
              className = "status-pill done";
            } else if (checkedCount > 0) {
              label = "● EN COURS";
              className = "status-pill in_progress";
            }

            return (
              <article key={phase.id} className={`phase-card ${isOpen ? "opened" : ""}`}>
                <div className="phase-head">
                  <div className="phase-title-wrap">
                    <div className="phase-icon">{phase.icon}</div>
                    <div>
                      <p className="phase-number">Phase {phase.number}</p>
                      <h3>{phase.title}</h3>
                    </div>
                  </div>
                  <span className={className}>{label}</span>
                </div>

                <p className="phase-description">{phase.description}</p>

                <div className="progress-block">
                  <div className="progress-bar">
                    <span style={{ width: `${phaseProgress}%` }} />
                  </div>
                  <div className="phase-metrics">
                    <strong>{checkedCount} / {phase.steps.length}</strong>
                    <span>étapes validées</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="toggle-button"
                  onClick={() => setOpenPhase(isOpen ? "" : phase.id)}
                >
                  {isOpen ? "Fermer les étapes" : "Ouvrir les étapes"}
                </button>

                {isOpen && (
                  <div className="checklist">
                    {phase.steps.map((step, index) => {
                      const isChecked = Boolean(checklist[phase.id]?.[String(index)]);

                      return (
                        <button
                          type="button"
                          key={`${phase.id}-${index}`}
                          className={`check-item ${isChecked ? "checked" : ""}`}
                          onClick={() => toggleStep(phase.id, index)}
                          aria-pressed={isChecked}
                        >
                          <span className="check-box" aria-hidden="true">
                            {isChecked ? "✓" : ""}
                          </span>
                          <span>{step}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
