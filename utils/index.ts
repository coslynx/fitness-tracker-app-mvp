"use server";

import { json } from "next/server";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, userId } = body;

    if (!message || !userId) {
      return json({ error: "Missing message or userId" }, { status: 400 });
    }

    const newSocialPost = await prisma.socialPost.create({
      data: {
        message,
        userId,
      },
    });

    revalidatePath(`/profile`);

    return json({ message: "Progress shared successfully!" });
  } catch (error: any) {
    console.error("Error sharing progress:", error);
    return json({ error: error.message || "Failed to share progress" }, { status: 500 });
  }
}