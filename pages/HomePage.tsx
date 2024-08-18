"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import Card from "@/components/Card";
import Chart from "@/components/Chart";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AppLayout from "@/components/AppLayout";

const HomePage = () => {
  const { data: session } = useSession();
  const store = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user");
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user.id) {
      fetchData();
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="animate-pulse rounded-md bg-gray-200 p-4 text-center">
          <div className="h-4 bg-gray-300 rounded-full w-24 mb-2"></div>
          <div className="h-2 bg-gray-300 rounded-full w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Fitness Tracker</h1>
      <Card title="Get Started">
        <p className="text-gray-700">
          Join our community of fitness enthusiasts and take control of your
          health! Start by setting your goals, tracking your progress, and
          connecting with others.
        </p>
        {session ? (
          <>
            <Button
              onClick={() => {
                store.setSnackbar({
                  open: true,
                  message: "Navigating to profile page",
                  severity: "info",
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Go to Profile
            </Button>
            <Button
              onClick={() => {
                store.setSnackbar({
                  open: true,
                  message: "Navigating to goals page",
                  severity: "info",
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Set Goals
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                store.setSnackbar({
                  open: true,
                  message: "Navigating to login page",
                  severity: "info",
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                store.setSnackbar({
                  open: true,
                  message: "Navigating to signup page",
                  severity: "info",
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </Button>
          </>
        )}
      </Card>
      <Card title="Featured Challenges">
        <p className="text-gray-700">
          Join our exciting challenges and compete with other members to reach
          your fitness goals. We offer a variety of challenges for all levels
          and interests.
        </p>
        <Button
          onClick={() => {
            store.setSnackbar({
              open: true,
              message: "Navigating to challenges page",
              severity: "info",
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Explore Challenges
        </Button>
      </Card>
      <Card title="About Us">
        <p className="text-gray-700">
          Fitness Tracker is designed to help you achieve your fitness goals
          with a supportive community. Our mission is to provide a platform that
          makes fitness fun, engaging, and attainable for everyone.
        </p>
        <Button
          onClick={() => {
            store.setSnackbar({
              open: true,
              message: "Navigating to about page",
              severity: "info",
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Learn More
        </Button>
      </Card>
    </div>
  );
};

export default HomePage;