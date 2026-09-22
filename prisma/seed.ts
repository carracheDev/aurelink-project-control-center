import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const phases = [
  {
    id: "analyse-modelisation",
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
  },
  {
    id: "identite-design",
    steps: [
      "Identité visuelle AureLink",
      "Character System",
      "Design System Figma",
      "Maquette authentification",
      "Maquettes Administration",
      "Maquettes Enseignant",
      "Maquettes Parent",
    ],
  },
  {
    id: "initialisation-technique",
    steps: [
      "Initialiser backend NestJS",
      "PostgreSQL + Prisma",
      "Initialiser Next.js",
      "Configuration environnement",
      "Git/GitHub",
      "CI/CD",
    ],
  },
  {
    id: "authentification-securite",
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
  },
  {
    id: "backend-administration",
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
  },
  {
    id: "notes-absences",
    steps: [
      "Modèle de notes",
      "Saisie des évaluations",
      "Calcul des moyennes",
      "Vue enseignants",
      "Vue parents",
      "Suivi absences",
      "Justifications",
    ],
  },
  {
    id: "interface-enseignant",
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
  },
  {
    id: "interface-parent",
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
  },
  {
    id: "administration-aurelink",
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
  },
  {
    id: "tests",
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
  },
  {
    id: "deploiement",
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
  },
  {
    id: "pilote-ecole",
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
  },
  {
    id: "release",
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
  },
] as const;

async function main() {
  for (const phase of phases) {
    for (const [index, label] of phase.steps.entries()) {
      await prisma.roadmapStep.upsert({
        where: {
          phaseId_stepId: {
            phaseId: phase.id,
            stepId: String(index),
          },
        },
        update: {},
        create: {
          phaseId: phase.id,
          stepId: String(index),
          label,
          isChecked: false,
        },
      });
    }
  }

  console.log("Seeded roadmap steps");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
