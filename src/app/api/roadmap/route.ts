import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma) {
    return NextResponse.json([], { status: 200 });
  }

  const steps = await prisma.roadmapStep.findMany({
    orderBy: [{ phaseId: "asc" }, { stepId: "asc" }],
  });

  return NextResponse.json(steps);
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured. Add your Neon PostgreSQL connection string." },
      { status: 503 }
    );
  }

  const body = await request.json();

  const { phaseId, stepId, isChecked, updatedBy } = body as {
    phaseId: string;
    stepId: string;
    isChecked: boolean;
    updatedBy?: string;
  };

  if (!phaseId || !stepId) {
    return NextResponse.json({ error: "phaseId and stepId are required" }, { status: 400 });
  }

  const step = await prisma.roadmapStep.upsert({
    where: {
      phaseId_stepId: {
        phaseId,
        stepId,
      },
    },
    update: {
      isChecked,
      updatedBy: updatedBy ?? "anonymous",
    },
    create: {
      phaseId,
      stepId,
      label: `Step ${stepId}`,
      isChecked,
      updatedBy: updatedBy ?? "anonymous",
    },
  });

  return NextResponse.json(step);
}
