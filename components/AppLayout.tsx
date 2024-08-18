"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const store = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch user data
      try {
        const response = await fetch("/api/user");
        const userData = await response.json();

        if (userData) {
          store.setUserData(userData);
        }
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
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-10">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;