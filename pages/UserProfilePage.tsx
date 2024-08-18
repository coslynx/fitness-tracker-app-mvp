"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import Card from "@/components/Card";
import Chart from "@/components/Chart";

const UserProfilePage = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [userData, setUserData] = useState<any | null>(null);
  const [progressData, setProgressData] = useState<
    { labels: string[]; datasets: any[] } | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/user?userId=${session?.user.id}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (session?.user.id) {
      fetchData();
    }
  }, [session]);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch(
          `/api/user/progress?userId=${session?.user.id}`
        );
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    if (userData?.id) {
      fetchProgressData();
    }
  }, [userData]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-800">
        User Profile: {userData?.name}
      </h1>
      <Card title="User Information">
        <div className="flex flex-col gap-2">
          <p className="text-gray-700">
            Email:{" "}
            <span className="font-bold">{userData?.email}</span>
          </p>
          <p className="text-gray-700">
            Joined On:{" "}
            <span className="font-bold">{userData?.createdAt}</span>
          </p>
        </div>
      </Card>
      {progressData && (
        <Card title="Progress Overview">
          <Chart data={progressData} />
        </Card>
      )}
    </div>
  );
};

export default UserProfilePage;