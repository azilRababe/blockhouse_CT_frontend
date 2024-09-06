import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axiosInstance from "@/utils/axiosInstance";

const CandlestickChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [chartData, setChartData] = useState({
    series: [
      {
        data: [] as { x: Date; y: any[] }[],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("candlestick-data/");
        const transformedData = transformToCandleStickData(response.data);
        setChartData({
          series: [{ data: transformedData }],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candlestick data", error);
        setError("Error fetching candlestick data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //  transform the main data to the format required by the chart library
  const transformToCandleStickData = (responseData: any) => {
    return responseData.data.map((item: any) => ({
      x: new Date(item.x),
      y: [item.open, item.high, item.low, item.close],
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ReactApexChart
        options={{
          chart: {
            type: "line",
            height: 350,
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        }}
        series={chartData.series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandlestickChart;
