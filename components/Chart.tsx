"use client";

import { LineController, LineElement, CategoryScale, PointElement, LinearScale, Title } from "chart.js";
import { Chart as ChartJS, registerDefaults } from "chart.js";
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";

ChartJS.register(LineController, LineElement, CategoryScale, PointElement, LinearScale, Title);
registerDefaults({
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: true,
      text: "Progress Chart",
      font: {
        size: 18,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Value",
        font: {
          size: 14,
        },
      },
    },
    x: {
      title: {
        display: true,
        text: "Date",
        font: {
          size: 14,
        },
      },
    },
  },
});

interface ChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const [chartRef, setChartRef] = useState<HTMLCanvasElement | null>(null);
  const store = useStore();

  useEffect(() => {
    if (chartRef && data) {
      const chart = new ChartJS(chartRef, {
        type: "line",
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      return () => chart.destroy();
    }
  }, [chartRef, data]);

  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-md p-4">
      <canvas ref={setChartRef} />
    </div>
  );
};

export default Chart;