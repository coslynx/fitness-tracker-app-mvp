"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useStore } from "@/store/store";
import Form from "@/components/Form";

const WorkoutLoggingPage = () => {
  const { data: session } = useSession();
  const store = useStore();

  const handleSubmit = async (data: {
    name: string;
    type: string;
    duration: number;
    intensity: string;
    notes?: string;
  }) => {
    try {
      const response = await fetch("/api/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId: session?.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log workout");
      }

      store.setSnackbar({
        open: true,
        message: "Workout logged successfully!",
        severity: "success",
      });
    } catch (error: any) {
      store.setSnackbar({
        open: true,
        message: error.message || "An error occurred",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-800">Log Your Workouts</h1>
      <Form type="workout" onSubmit={handleSubmit} />
    </div>
  );
};

export default WorkoutLoggingPage;