"use client";

import React from "react";
import Chart from "@/components/charts";
import CandlestickChart from "@/components/CandlestickChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* bar chart */}
          <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
            <Chart type="bar" endpoint="bar-chart-data/" title="Bar Chart" />
          </div>
          {/* line chart */}
          <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
            <Chart type="line" endpoint="line-chart-data/" title="Line Chart" />
          </div>
          {/* pie chart */}
          <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
            <Chart type="pie" endpoint="pie-chart-data/" title="Pie Chart" />
          </div>
          {/* Candlestick Chart */}
          <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
            <CandlestickChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
