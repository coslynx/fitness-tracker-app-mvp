"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useStore } from "@/store/store";
import Form from "@/components/Form";

const SocialSharingPage = () => {
  const { data: session } = useSession();
  const store = useStore();

  const handleSubmit = async (data: { message: string }) => {
    try {
      const response = await fetch("/api/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: data.message,
          userId: session?.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to share progress");
      }

      store.setSnackbar({
        open: true,
        message: "Progress shared successfully!",
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
      <h1 className="text-3xl font-bold text-gray-800">Share Your Fitness Progress</h1>
      <Form type="social" onSubmit={handleSubmit} />
    </div>
  );
};

export default SocialSharingPage;