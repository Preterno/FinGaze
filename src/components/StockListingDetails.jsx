import React, { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const StockListingDetails = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [editedStockName, setEditedStockName] = useState("");
  const [editedNumberOfStocks, setEditedNumberOfStocks] = useState("");
  const modalRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch stock details
    const fetchStocks = async () => {
      try {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        console.log(base_url);
        const response = await fetch(base_url + "api/stocks/list");
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
        toast.error("Error fetching stocks data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

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
    setEditedStockName(stock.stockName);
    setEditedNumberOfStocks(stock.noOfStocks);
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  const handleUpdateStock = async () => {
    if (currentStock) {
      const updatedStockData = {
        id: currentStock.id,
        currentDate: new Date().toISOString().split("T")[0],
        currentPrice: parseFloat(currentStock.currentPrice),
        noOfStocks: parseInt(editedNumberOfStocks, 10),
      };

      try {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(base_url + "api/stocks/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStockData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update stock: ${response.statusText}`);
        }

        setStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.id === currentStock.id
              ? {
                  ...stock,
                  noOfStocks: updatedStockData.noOfStocks,
                  investDate: updatedStockData.currentDate,
                }
              : stock
          )
        );
        toast.success("Stock updated successfully");
        console.log("Stock updated successfully:", updatedStockData);
        setIsModalOpen(false);
        resetModal();
      } catch (error) {
        toast.error("Error updating stock");
        console.error("Error updating stock:", error);
      }
    }
  };

  const handleDeleteStock = async (stockId) => {
    try {
      const base_url = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${base_url}api/stocks/${stockId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete stock: ${response.statusText}`);
      }

      toast.success("Stock deleted successfully");
      console.log("Stock deleted successfully:", stockId);
      setStocks((prevStocks) =>
        prevStocks.filter((stock) => stock.id !== stockId)
      );
    } catch (error) {
      toast.error("Error deleting stock");
      console.error("Error deleting stock:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-accent text-2xl h-full flex justify-center items-center p-16">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="w-full pt-4 relative">
      <div className="grid grid-cols-[1.75fr_1fr_0.95fr_0.75fr_1fr_1fr_auto] text-right text-lg font-medium text-accent border-b-2 pb-2 border-accent-border">
        <div className="text-left">Stock Name</div>
        <div>Invest Date</div>
        <div>Market Cap</div>
        <div>Change</div>
        <div>Price/Stock</div>
        <div>No of Stocks</div>
        <div>
          <div className="relative flex items-center justify-center pl-2">
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
            className="grid grid-cols-[1.75fr_1fr_0.95fr_0.75fr_1fr_1fr_auto] items-center py-4 text-lg border-b-2 text-white border-accent-border"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-accent-border">
                {stock.stockSymbol[0]}
              </div>
              <div className="flex flex-col">
                <div className="font-medium leading-tight">
                  {stock.stockName}
                </div>
                <div className="text-accent text-sm">{stock.stockSymbol}</div>
              </div>
            </div>

            <div className="text-right">{stock.investDate}</div>
            <div className="text-right">{stock.marketCapitalization}</div>
            <div
              className={`font-medium ${
                parseFloat(stock.change) > 0 ? "text-yellow" : "text-dark-peach"
              } text-right`}
            >
              {stock.change > 0 ? "+" + stock.change : stock.change}%
            </div>
            <div className="text-right">{stock.currentPrice}</div>
            <div className="text-yellow text-right">
              {stock.noOfStocks} Lots
            </div>

            {/* Dropdown Button */}
            <div className="relative flex items-center justify-center pl-2">
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
                      console.log("Delete clicked for", stock.id);
                      handleDeleteStock(stock.id);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-light-black rounded-3xl p-8 shadow-[0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.8),0_12px_24px_rgba(0,0,0,0.9)] w-[90%] max-w-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Edit Stock</h2>

            <div className="space-y-4 text-base">
              <div className="bg-light-gray p-4 rounded-xl text-white">
                <p className="font-bold text-lg">{currentStock.stockName}</p>
                <p className=" text-accent">
                  Symbol: {currentStock.stockSymbol}
                </p>
                <p>Price: ${currentStock.currentPrice}</p>
                <p>Market Cap: {currentStock.marketCapitalization}</p>
              </div>

              <div>
                <label className="text-accent block mb-2">
                  Number of Stocks
                </label>
                <input
                  type="number"
                  value={editedNumberOfStocks}
                  onChange={(e) => setEditedNumberOfStocks(e.target.value)}
                  min={1}
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
