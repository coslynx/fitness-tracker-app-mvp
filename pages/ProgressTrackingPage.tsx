"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import Chart from "@/components/Chart";

const ProgressTrackingPage = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [progressData, setProgressData] = useState<
    { labels: string[]; datasets: any[] } | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/progress?userId=${session?.user.id}`);
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    if (session?.user.id) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-800">
        Track Your Fitness Progress
      </h1>
      {progressData && <Chart data={progressData} />}
    </div>
  );
};

export default ProgressTrackingPage;