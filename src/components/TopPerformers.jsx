import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopPerformers = () => {
  const [topStocks, setTopStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPerformers = async () => {
      try {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(base_url + "api/top-performers");
        const data = await response.json();

        const parsedData = data.map((entry) => {
          const nameMatch = entry.match(/Name: (.*?),/);
          const symbolMatch = entry.match(/Symbol: (\w+)/);
          const changeMatch = entry.match(/Change: ([\d\.]+%)/);
          const priceMatch = entry.match(/Price: ([\d\.]+)/);

          return {
            name: nameMatch ? nameMatch[1] : "",
            symbol: symbolMatch ? symbolMatch[1] : "",
            change: changeMatch ? changeMatch[1] : "",
            price: priceMatch ? parseFloat(priceMatch[1]) : 0,
          };
        });

        setTopStocks(parsedData);
      } catch (error) {
        console.error("Error fetching top performers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPerformers();
  }, []);

  return (
    <div className="w-full py-8 px-8 bg-light-black rounded-3xl shadow-[0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.8),0_12px_24px_rgba(0,0,0,0.9)]">
      <div className="text-3xl font-medium text-white">Top Performers</div>

      <div className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr] text-right text-lg font-medium text-accent border-b-[1px] pb-2 border-accent-border mt-4">
        <div className=" text-left">Stock Name</div>
        <div>Symbol</div>
        <div>Curr. Price</div>
        <div>Growth</div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-48">
          <span className="loader"></span>
        </div>
      ) : (
        <AnimatePresence>
          {topStocks.map((stock, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr] items-center py-3 border-b-[1px] border-accent-border text-white text-right"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="flex-shrink-0 w-9 text-xl h-9 bg-gray-200 rounded-full flex items-center justify-center font-bold text-accent-border">
                  {stock.symbol[0]}
                </div>
                <div className="flex flex-col">
                  <div className="font-medium">{stock.name}</div>
                </div>
              </div>

              <div className="text-accent">{stock.symbol}</div>

              <div>${stock.price}</div>

              <div className="font-medium text-yellow">+{stock.change}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default TopPerformers;
