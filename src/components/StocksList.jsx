import React, { useState, useRef, useEffect } from "react";
import StockListingDetails from "./StockListingDetails";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";

const StocksList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockDetails, setStockDetails] = useState(null);
  const [stockNotFound, setStockNotFound] = useState(false);
  const [numberOfStocks, setNumberOfStocks] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

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
    setSearchQuery("");
    setStockDetails(null);
    setNumberOfStocks(0);
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setStockDetails(null);

    try {
      const base_url = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${base_url}api/stocks/details?symbol=${searchQuery.toUpperCase()}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch stock details: ${response.statusText}`
        );
      }

      const fetchedStock = await response.json();
      if (fetchedStock.stockName == "") {
        setStockNotFound(true);
      } else {
        setStockNotFound(false);
        setStockDetails(fetchedStock);
      }
    } catch (error) {
      console.error("Error fetching stock details:", error);
      toast.error("Error fetching stock details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStock = async () => {
    if (stockDetails && numberOfStocks > 0) {
      const stockData = {
        stockSymbol: stockDetails.stockSymbol,
        stockName: stockDetails.stockName,
        oldPrice: parseFloat(stockDetails.currentPrice),
        noOfStocks: numberOfStocks,
      };
      try {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(base_url + "api/stocks/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stockData),
        });

        if (!response.ok) {
          throw new Error(`Failed to add stock: ${response.statusText}`);
        }
        toast.success(
          "Stock added successfully. Please refresh page to see the changes."
        );
        console.log("Stock added successfully:", stockData);
        setIsModalOpen(false);
        resetModal();
      } catch (error) {
        console.error("Error adding stock:", error);
        toast.error("Error adding stock details");
      }
    }
  };

  return (
    <div className="flex flex-col bg-light-black h-full rounded-3xl p-8 shadow-[0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.8),0_12px_24px_rgba(0,0,0,0.9)] relative">
      <div className="text-white flex justify-between items-center">
        <div className="text-3xl">My Stock</div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex rounded-3xl border-accent-border border-2 px-2 gap-1 items-center py-1 hover:bg-accent-border transition-colors"
        >
          <Plus size={16} />
          <p className="pr-2 text-lg">Add</p>
        </button>
      </div>
      <StockListingDetails />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-light-black rounded-3xl p-8 shadow-[0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.8),0_12px_24px_rgba(0,0,0,0.9)] w-[90%] max-w-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Add Stock</h2>
            <div className="mb-4">
              <div className="relative">
                <Search
                  className="absolute top-2.5 left-3 text-accent"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Enter a Stock Symbol"
                  className="w-full bg-light-gray rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="absolute top-1 right-1 bg-yellow text-black px-4 py-1 rounded-xl font-semibold hover:bg-[#c7e100] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
            {isLoading && <p className="text-yellow text-center">Loading...</p>}
            {!isLoading && stockNotFound && (
              <p className="text-yellow text-center">Stock not found</p>
            )}
            {stockDetails && (
              <div className="mb-6 text-base">
                <div className="bg-light-gray p-4 rounded-xl text-white">
                  <p className="font-bold text-lg">{stockDetails.stockName}</p>
                  <p className=" text-accent">
                    Symbol: {stockDetails.stockSymbol}
                  </p>
                  <p>Price: ${stockDetails.currentPrice}</p>
                  <p>Volume: {stockDetails.marketCap}</p>
                </div>
                <label className="text-accent mt-4 block">
                  Number of Stocks
                </label>
                <input
                  type="number"
                  className="w-full bg-light-gray rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow mt-2"
                  value={numberOfStocks}
                  min={1}
                  onChange={(e) => setNumberOfStocks(Number(e.target.value))}
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleAddStock}
                disabled={!stockDetails || numberOfStocks <= 0}
                className={`${
                  stockDetails && numberOfStocks > 0
                    ? "bg-yellow text-black hover:bg-dark-peach"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                } px-6 py-2 rounded-xl font-semibold transition-colors`}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StocksList;
