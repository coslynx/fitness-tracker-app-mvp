"use client";

import { prisma } from "@/db";

export async function calculateProgress(userId: string) {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
    });

    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
    });

    const nutritionEntries = await prisma.nutritionEntry.findMany({
      where: {
        userId,
      },
    });

    const progressData = goals.map((goal) => {
      const totalWorkouts = workouts.filter(
        (workout) => workout.goalId === goal.id
      ).length;
      const totalCaloriesBurned = workouts.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
      );
      const totalCaloriesConsumed = nutritionEntries.reduce(
        (total, entry) => total + entry.calories,
        0
      );
      const netCalories = totalCaloriesBurned - totalCaloriesConsumed;

      return {
        goalName: goal.name,
        totalWorkouts,
        totalCaloriesBurned,
        totalCaloriesConsumed,
        netCalories,
        progress: (totalWorkouts / goal.targetWorkouts) * 100,
      };
    });

    return progressData;
  } catch (error: any) {
    console.error("Error calculating progress:", error);
    throw new Error("Failed to calculate progress");
  }
}