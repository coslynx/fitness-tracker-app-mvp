"use client";

import { useState } from "react";

interface ButtonProps {
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className,
  children,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (onClick) {
      await onClick();
    }
    setIsLoading(false);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 mr-2"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-75"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;