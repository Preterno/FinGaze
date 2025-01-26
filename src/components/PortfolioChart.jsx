import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const dataSets = {
  "24h": [
    { time: "2 PM", value: 50000 },
    { time: "3 PM", value: 150000 },
    { time: "4 PM", value: 200000 },
    { time: "5 PM", value: 100000 },
    { time: "6 PM", value: 90000 },
    { time: "7 PM", value: 210000 },
    { time: "8 PM", value: 250000 },
  ],
  "7d": [
    { time: "Mon", value: 150000 },
    { time: "Tue", value: 180000 },
    { time: "Wed", value: 210000 },
    { time: "Thu", value: 200000 },
    { time: "Fri", value: 220000 },
    { time: "Sat", value: 230000 },
    { time: "Sun", value: 234412 },
  ],
  "1m": [
    { time: "Week 1", value: 100000 },
    { time: "Week 2", value: 150000 },
    { time: "Week 3", value: 200000 },
    { time: "Week 4", value: 234412 },
  ],
  "6m": [
    { time: "Jan", value: 100000 },
    { time: "Feb", value: 150000 },
    { time: "Mar", value: 180000 },
    { time: "Apr", value: 210000 },
    { time: "May", value: 250000 },
    { time: "Jun", value: 234412 },
  ],
};

const PortfolioChart = () => {
  const [selectedRange, setSelectedRange] = useState("24h");

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  return (
    <div className="w-full py-4 px-6 bg-light-black text-white rounded-3xl shadow-[0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.8),0_12px_24px_rgba(0,0,0,0.9)]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 ">
        <div>
          <p className="text-accent text-sm">Portfolio Value</p>
          <h2 className="text-3xl font-medium leading-tight">
            $234,412.84
          </h2>
        </div>
        <div className="flex gap-2">
          {["24h", "7d", "1m", "6m"].map((range) => (
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
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataSets[selectedRange]}>
            <XAxis
              dataKey="time"
              stroke="#777777"
              tick={{ fontSize: 16, fill: "#777777" }}
            />
            <YAxis
              stroke="#777777"
              tick={{ fontSize: 16, fill: "#777777" }}
              domain={["auto", "auto"]}
            />
            <Tooltip
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
              dot={{ stroke: "#dbf508", strokeWidth: 3, r: 4 }}
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
      </div>
    </div>
  );
};

export default PortfolioChart;
