// components/Chart.js
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import randomColor from "randomcolor";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
} from "chart.js";
import axiosInstance from "@/utils/axiosInstance";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale
);

interface ChartProps {
  type: "bar" | "line" | "pie";
  endpoint: string;
  title?: string;
}

const Chart = ({ type, endpoint, title }: ChartProps) => {
  interface ChartData {
    labels: any[];
    datasets: {
      data: any;
      backgroundColor: string[];
    }[];
  }

  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(endpoint);
        const transformedData = formatData(response.data);
        setData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  const formatData = (responseData: any) => {
    const labelColorMapping: { [key: string]: string } = {
      Red: "#ef233c",
      Blue: "#8ecae6",
      Yellow: "#ffee32",
    };
    const colors = randomColor({
      count: responseData.labels.length,
      luminosity: "bright",
      format: "rgba",
    });

    return {
      labels: responseData.labels,
      datasets: [
        {
          data: responseData.data,
          backgroundColor:
            type === "pie"
              ? responseData.labels.map(
                  (label: any) => labelColorMapping[label] || randomColor()
                )
              : colors,
        },
      ],
    };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const ChartComponent = () => {
    switch (type) {
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      case "pie":
        return <Pie data={data} options={options} />;
      default:
        return null;
    }
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false, // Set to true to allow chart to grow in size
    plugins: {
      legend: {
        display: type === "pie",
      },
      title: {
        display: true,
        text: title || "Chart",
      },
    },
  };

  return (
    <div>
      <ChartComponent />
    </div>
  );
};

export default Chart;
