import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const PortfolioChart = () => {
  const [selectedRange, setSelectedRange] = useState("3m");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const base_url = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(base_url + "api/chart");
        const data = await response.json();
        const processedData = processApiData(data["3_months"]);
        setChartData(processedData);
        setPortfolioValue(processedData[processedData.length - 1]?.value || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Process API Data for different ranges
  const processApiData = (data) => {
    let lastValidValue = null;
    const smoothedData = data.map((value) => {
      if (value === 0 && lastValidValue !== null) return lastValidValue;
      if (value !== 0) lastValidValue = value;
      return value;
    });

    return smoothedData.map((value, index) => ({
      time: formatDate(
        new Date(Date.now() - (90 - index) * 24 * 60 * 60 * 1000)
      ),
      value: parseFloat(value.toFixed(2)),
    }));
  };

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")} ${date.toLocaleString(
      "default",
      { month: "short" }
    )}`;
  };

  const getFilteredData = () => {
    if (selectedRange === "7d") return chartData.slice(-7);
    if (selectedRange === "1m") return chartData.slice(-30);
    if (selectedRange === "3m") return chartData.slice(-90); // All 90 days
    return [];
  };

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    const filteredData = getFilteredData();
    setPortfolioValue(filteredData[filteredData.length - 1]?.value || 0);
  };

  return (
    <div className="w-full py-4 px-6 bg-light-black text-white rounded-3xl shadow-[0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.8),0_12px_24px_rgba(0,0,0,0.9)]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-accent text-sm">Portfolio Value</p>
          <h2 className="text-3xl font-medium leading-tight">
            ${loading ? "Loading..." : portfolioValue.toFixed(2)}
          </h2>
        </div>
        <div className="flex gap-2">
          {["7d", "1m", "3m"].map((range) => (
            <button
              key={range}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                selectedRange === range
                  ? "bg-accent-border text-yellow"
                  : "bg-light-gray text-white hover:bg-accent-border hover:text-yellow"
              }`}
              onClick={() => handleRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-72">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="loader"></span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getFilteredData()}>
              <XAxis
                dataKey="time"
                stroke="#777777"
                tick={{ fontSize: 12, fill: "#777777" }}
              />
              <YAxis
                stroke="#777777"
                tickFormatter={(value) => `$${value}`}
                tick={{ fontSize: 12, fill: "#777777" }}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, "Value"]}
                contentStyle={{
                  backgroundColor: "#2c2c2c",
                  borderColor: "#444444",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#dbf508" }}
                itemStyle={{ color: "#dbf508" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#dbf508"
                fillOpacity={0.5}
                fill="url(#colorYellow)"
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#dbf508"
                strokeWidth={2}
                dot={{ stroke: "#dbf508", strokeWidth: 3, r: 0 }}
                activeDot={{ r: 6 }}
              />
              <defs>
                <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dbf508" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#dbf508" stopOpacity={0} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PortfolioChart;
