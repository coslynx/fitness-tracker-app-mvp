"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface FormProps {
  type: "goal" | "workout" | "nutrition" | "social";
  onSubmit: (data: any) => void;
  initialValues?: any;
}

const Form: React.FC<FormProps> = ({ type, onSubmit, initialValues }) => {
  const store = useStore();
  const [formData, setFormData] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await onSubmit(formData);
      // Handle success (e.g., reset form, show success message)
      setFormData({});
      store.setSnackbar({
        open: true,
        message: "Data submitted successfully!",
        severity: "success",
      });
    } catch (error: any) {
      // Handle errors (e.g., show error messages)
      setErrors(error.response?.data?.errors || {});
      store.setSnackbar({
        open: true,
        message: error.message || "An error occurred",
        severity: "error",
      });
    }
  };

  const formFields = {
    goal: [
      {
        type: "text",
        label: "Goal Name",
        name: "name",
        placeholder: "Enter goal name",
        required: true,
      },
      {
        type: "text",
        label: "Goal Description",
        name: "description",
        placeholder: "Enter goal description",
        required: true,
      },
      {
        type: "date",
        label: "Start Date",
        name: "startDate",
        required: true,
      },
      {
        type: "date",
        label: "End Date",
        name: "endDate",
        required: true,
      },
    ],
    workout: [
      {
        type: "text",
        label: "Workout Name",
        name: "name",
        placeholder: "Enter workout name",
        required: true,
      },
      {
        type: "text",
        label: "Workout Type",
        name: "type",
        placeholder: "Enter workout type",
        required: true,
      },
      {
        type: "number",
        label: "Duration (minutes)",
        name: "duration",
        placeholder: "Enter workout duration",
        required: true,
      },
      {
        type: "text",
        label: "Intensity",
        name: "intensity",
        placeholder: "Enter workout intensity",
        required: true,
      },
      {
        type: "textarea",
        label: "Workout Notes",
        name: "notes",
        placeholder: "Enter workout notes",
      },
    ],
    nutrition: [
      {
        type: "text",
        label: "Meal Name",
        name: "name",
        placeholder: "Enter meal name",
        required: true,
      },
      {
        type: "text",
        label: "Meal Description",
        name: "description",
        placeholder: "Enter meal description",
        required: true,
      },
      {
        type: "number",
        label: "Calories",
        name: "calories",
        placeholder: "Enter calories",
        required: true,
      },
      {
        type: "text",
        label: "Macros (e.g., Protein: 20g, Carbs: 30g, Fat: 10g)",
        name: "macros",
        placeholder: "Enter macros",
        required: true,
      },
    ],
    social: [
      {
        type: "textarea",
        label: "Share your fitness progress",
        name: "message",
        placeholder: "Share your thoughts and progress",
        required: true,
      },
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-6">{type}</h2>
      {formFields[type].map((field) => (
        <div key={field.label} className="mb-4">
          <Input
            type={field.type}
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm italic">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <div className="flex items-center justify-between">
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;