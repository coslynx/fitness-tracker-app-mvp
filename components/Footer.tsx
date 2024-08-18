"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-10 py-6">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} Fitness Tracker. All rights reserved.
        </p>
        {session && (
          <p className="text-gray-500">
            Logged in as: {session.user.email}
          </p>
        )}
        <Link href="/terms" className="text-gray-500 hover:text-gray-300">
          Terms of Service
        </Link>
        {" | "}
        <Link href="/privacy" className="text-gray-500 hover:text-gray-300">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;