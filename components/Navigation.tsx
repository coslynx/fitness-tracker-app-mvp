"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useStore } from "@/store/store";

const Navigation = () => {
  const { data: session } = useSession();
  const store = useStore();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Fitness Tracker
        </Link>
        <ul className="flex space-x-6">
          {session ? (
            <>
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-gray-800">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/goals"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Goals
                </Link>
              </li>
              <li>
                <Link
                  href="/workouts"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Workouts
                </Link>
              </li>
              <li>
                <Link
                  href="/progress"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Progress
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    store.signOut();
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;