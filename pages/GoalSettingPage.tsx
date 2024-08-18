"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useStore } from "@/store/store";
import Form from "@/components/Form";

const GoalSettingPage = () => {
  const { data: session } = useSession();
  const store = useStore();

  const handleSubmit = async (data: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      const response = await fetch("/api/goal", {
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
        throw new Error("Failed to create goal");
      }

      store.setSnackbar({
        open: true,
        message: "Goal created successfully!",
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
      <h1 className="text-3xl font-bold text-gray-800">Set Your Fitness Goals</h1>
      <Form type="goal" onSubmit={handleSubmit} />
    </div>
  );
};

export default GoalSettingPage;