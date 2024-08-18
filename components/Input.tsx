"use client";

import { useState } from "react";

interface InputProps {
  type: string;
  label: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  required,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label htmlFor={label} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        type={type === "password" && !showPassword ? "password" : type}
        id={label}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          disabled ? "bg-gray-300 cursor-not-allowed" : ""
        }`}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {type === "password" && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            onClick={handlePasswordVisibility}
            className="focus:outline-none"
          >
            {showPassword ? (
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </span>
      )}
      {type === "textarea" && (
        <textarea
          id={label}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            disabled ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      )}
      {type === "select" && (
        <select
          id={label}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            disabled ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
          value={value || ""}
          onChange={onChange}
          required={required}
          disabled={disabled}
        >
          {Array.isArray(value)
            ? value.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            : null}
        </select>
      )}
    </div>
  );
};

export default Input;