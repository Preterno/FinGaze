import React, { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StockListingDetails = () => {
  const stocks = [
    {
      name: "Adidas AG",
      symbol: "ADS",
      investDate: "Apr 12, 2024",
      volume: "534,911",
      change: "+1.2%",
      changePositive: true,
      pricePerStock: "$53.4912",
      numberOfStocks: "100.000 Lots",
    },
    {
      name: "Adidas AG",
      symbol: "ADS",
      investDate: "Apr 12, 2024",
      volume: "534,911",
      change: "+1.2%",
      changePositive: true,
      pricePerStock: "$53.4912",
      numberOfStocks: "100.000 Lots",
    },
    {
      name: "Adidas AG",
      symbol: "ADS",
      investDate: "Apr 12, 2024",
      volume: "534,911",
      change: "+1.2%",
      changePositive: true,
      pricePerStock: "$53.4912",
      numberOfStocks: "100.000 Lots",
    },
    {
      name: "Adidas AG",
      symbol: "ADS",
      investDate: "Apr 12, 2024",
      volume: "534,911",
      change: "+1.2%",
      changePositive: true,
      pricePerStock: "$53.4912",
      numberOfStocks: "100.000 Lots",
    },
    {
      name: "Adidas AG",
      symbol: "ADS",
      investDate: "Apr 12, 2024",
      volume: "534,911",
      change: "+1.2%",
      changePositive: true,
      pricePerStock: "$53.4912",
      numberOfStocks: "100.000 Lots",
    },
    {
      name: "Adidas AG",
      symbol: "ADS",
      investDate: "Apr 12, 2024",
      volume: "534,911",
      change: "+1.2%",
      changePositive: true,
      pricePerStock: "$53.4912",
      numberOfStocks: "100.000 Lots",
    },
    {
      name: "Adidas AG",
      symbol: "ADS",
      investDate: "Apr 12, 2024",
      volume: "534,911",
      change: "+1.2%",
      changePositive: true,
      pricePerStock: "$53.4912",
      numberOfStocks: "100.000 Lots",
    },
    {
      name: "Adidas AG",
      symbol: "ADS",
      investDate: "Apr 12, 2024",
      volume: "534,911",
      change: "+1.2%",
      changePositive: true,
      pricePerStock: "$53.4912",
      numberOfStocks: "100.000 Lots",
    },
    {
      name: "Apple Inc",
      symbol: "AAPL",
      investDate: "Apr 11, 2024",
      volume: "4,324,800",
      change: "+2.2%",
      changePositive: true,
      pricePerStock: "$216.2416",
      numberOfStocks: "20.000 Lots",
    },
    {
      name: "Twitter Inc",
      symbol: "TWTR",
      investDate: "Apr 10, 2024",
      volume: "534,911",
      change: "-1.5%",
      pricePerStock: "$53.7031",
      numberOfStocks: "100.000 Lots",
      changePositive: false,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [editedStockName, setEditedStockName] = useState("");
  const [editedNumberOfStocks, setEditedNumberOfStocks] = useState("");
  const modalRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
        resetModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const resetModal = () => {
    setCurrentStock(null);
    setEditedStockName("");
    setEditedNumberOfStocks("");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const openModal = (stock) => {
    setCurrentStock(stock);
    setEditedStockName(stock.name);
    setEditedNumberOfStocks(stock.numberOfStocks);
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  const handleUpdateStock = () => {
    console.log("Updated Stock:", {
      ...currentStock,
      name: editedStockName,
      numberOfStocks: editedNumberOfStocks,
    });

    setIsModalOpen(false);
    resetModal();
  };

  return (
    <div className="w-full pt-4 relative">
      <div className="grid grid-cols-[1.5fr_1fr_0.85fr_0.75fr_1fr_0.85fr_auto] text-lg font-medium text-accent border-b-2 pb-2 border-accent-border">
        <div>Stock Name</div>
        <div>Invest Date</div>
        <div>Volume</div>
        <div>Change</div>
        <div>Price/Stock</div>
        <div>No of Stocks</div>
        <div>
          <div className="relative flex items-center justify-center">
            <button className="invisible p-2">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {stocks.map((stock, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[1.5fr_1fr_0.85fr_0.75fr_1fr_0.85fr_auto] items-center py-4 text-lg border-b-2 text-white border-accent-border"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-accent-border">
                {stock.symbol[0]}
              </div>
              <div className="flex flex-col">
                <div className="font-medium leading-tight">{stock.name}</div>
                <div className="text-accent text-sm">{stock.symbol}</div>
              </div>
            </div>

            <div>{stock.investDate}</div>
            <div>{stock.volume}</div>
            <div
              className={`font-medium  ${
                stock.changePositive ? "text-yellow" : "text-dark-peach"
              }`}
            >
              {stock.change}
            </div>
            <div>{stock.pricePerStock}</div>
            <div className="text-yellow">{stock.numberOfStocks}</div>

            {/* Dropdown Button */}
            <div className="relative flex items-center justify-center">
              <button
                className="text-accent hover:bg-accent-border rounded-full p-2 transition-colors"
                onClick={() => toggleDropdown(index)}
              >
                <MoreHorizontal size={16} />
              </button>

              {dropdownOpen === index && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-5 mt-2 bg-[#2c2c2c] rounded-lg shadow-lg z-20"
                >
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-white rounded-t-lg hover:bg-accent cursor-pointer"
                    onClick={() => openModal(stock)}
                  >
                    <Edit className="mr-2" size={16} /> Edit
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-white hover:bg-dark-peach rounded-b-lg cursor-pointer"
                    onClick={() => {
                      console.log("Delete clicked for", stock.name);
                      setDropdownOpen(null);
                    }}
                  >
                    <Trash2 className="mr-2" size={16} /> Delete
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {isModalOpen && currentStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-light-black rounded-3xl p-8 shadow-[0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.8),0_12px_24px_rgba(0,0,0,0.9)] w-[90%] max-w-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Edit Stock</h2>

            <div className="space-y-4">
              <div className="bg-light-gray p-4 rounded-xl text-white">
                <p className="font-bold text-lg">{currentStock.symbol}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-accent">Current Price</p>
                    <p>{currentStock.pricePerStock}</p>
                  </div>
                  <div>
                    <p className="text-accent">Current Volume</p>
                    <p>{currentStock.volume}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-accent block mb-2">Stock Name</label>
                <input
                  type="text"
                  value={editedStockName}
                  onChange={(e) => setEditedStockName(e.target.value)}
                  className="w-full bg-light-gray rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow"
                />
              </div>

              <div>
                <label className="text-accent block mb-2">
                  Number of Stocks
                </label>
                <input
                  type="text"
                  value={editedNumberOfStocks}
                  onChange={(e) => setEditedNumberOfStocks(e.target.value)}
                  className="w-full bg-light-gray rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleUpdateStock}
                  className="bg-yellow text-black px-6 py-2 rounded-xl font-semibold hover:bg-[#c7e100] transition-colors"
                >
                  Update Values
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockListingDetails;
