import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopPerformers = () => {
  const topStocks = [
    { name: "Adidas AG", symbol: "ADS", price: "$152.30", increase: "+2.3%" },
    { name: "Apple Inc", symbol: "AAPL", price: "$174.90", increase: "+1.8%" },
    { name: "Microsoft", symbol: "MSFT", price: "$310.50", increase: "+1.5%" },
    { name: "Tesla Inc", symbol: "TSLA", price: "$835.25", increase: "+1.4%" },
    { name: "Amazon.com", symbol: "AMZN", price: "$129.90", increase: "+1.2%" },
  ];

  return (
    <div className="w-full py-8 px-8 bg-light-black rounded-3xl shadow-[0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.8),0_12px_24px_rgba(0,0,0,0.9)]">
      <div className="text-3xl font-medium text-white ">
        Top Performers
      </div>

      <div className="grid grid-cols-[1.5fr_0.75fr_0.75fr_0.85fr] text-lg font-medium text-accent border-b-[1px] pb-2 border-accent-border mt-4">
        <div>Stock Name</div>
        <div>Symbol</div>
        <div>Price</div>
        <div>Increase</div>
      </div>

      <AnimatePresence>
        {topStocks.map((stock, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[1.5fr_0.75fr_0.75fr_0.85fr] items-center py-3 border-b-[1px] border-accent-border text-white"
          >
            {/* Stock Name */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-accent-border">
                {stock.symbol[0]}
              </div>
              <div className="flex flex-col">
                <div className="font-medium">{stock.name}</div>
              </div>
            </div>

            {/* Stock Symbol */}
            <div className="text-accent">{stock.symbol}</div>

            {/* Stock Price */}
            <div>{stock.price}</div>

            {/* Stock Increase */}
            <div className="font-medium text-yellow">{stock.increase}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TopPerformers;
