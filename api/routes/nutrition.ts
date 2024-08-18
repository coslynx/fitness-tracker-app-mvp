"use server";

import { json } from "next/server";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, calories, macros, userId } = body;

    if (!name || !description || !calories || !macros || !userId) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const newNutritionEntry = await prisma.nutritionEntry.create({
      data: {
        name,
        description,
        calories,
        macros,
        userId,
      },
    });

    revalidatePath(`/profile`);

    return json({ message: "Nutrition entry created successfully!" });
  } catch (error: any) {
    console.error("Error creating nutrition entry:", error);
    return json({ error: error.message || "Failed to create nutrition entry" }, { status: 500 });
  }
}