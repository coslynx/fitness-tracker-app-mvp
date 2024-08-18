"use server";

import { json } from "next/server";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, startDate, endDate, userId } = body;

    if (!name || !description || !startDate || !endDate || !userId) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const newGoal = await prisma.goal.create({
      data: {
        name,
        description,
        startDate,
        endDate,
        userId,
      },
    });

    revalidatePath(`/profile`);

    return json({ message: "Goal created successfully!" });
  } catch (error: any) {
    console.error("Error creating goal:", error);
    return json({ error: error.message || "Failed to create goal" }, { status: 500 });
  }
}