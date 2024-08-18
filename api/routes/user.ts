"use server";

import { json } from "next/server";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return json({ error: "Missing email or password" }, { status: 400 });
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: user.email,
          name: user.displayName || user.email,
          provider: "firebase",
        },
      });
    }

    revalidatePath("/");

    return json({ message: "User logged in successfully!" });
  } catch (error: any) {
    console.error("Error logging in user:", error);

    if (error.code === "auth/user-not-found") {
      return json({ error: "User not found" }, { status: 404 });
    } else if (error.code === "auth/wrong-password") {
      return json({ error: "Incorrect password" }, { status: 401 });
    }

    return json({ error: error.message || "Failed to log in user" }, { status: 500 });
  }
}