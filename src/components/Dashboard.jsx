import React from "react";
import StocksList from "./StocksList";
import PortfolioChart from "./PortfolioChart";
import TopPerformers from "./TopPerformers";

const Dashboard = () => {
  return (
    <div className="raleway bg-black flex min-h-screen justify-center p-8">
      <div className="flex flex-1 max-w-[1400px] min-w-[1000px] gap-8">
        <div className="flex-[6.5]">
          <StocksList />
        </div>

        <div className="flex-[3.5] flex flex-col gap-8 sticky top-6">
          <PortfolioChart />
          <TopPerformers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
