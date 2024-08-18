"use server";

import { json } from "next/server";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, duration, intensity, notes, userId } = body;

    if (!name || !type || !duration || !intensity || !userId) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const newWorkout = await prisma.workout.create({
      data: {
        name,
        type,
        duration,
        intensity,
        notes,
        userId,
      },
    });

    revalidatePath(`/profile`);

    return json({ message: "Workout logged successfully!" });
  } catch (error: any) {
    console.error("Error creating workout:", error);
    return json(
      { error: error.message || "Failed to create workout" },
      { status: 500 }
    );
  }
}