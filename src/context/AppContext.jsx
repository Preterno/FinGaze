import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import showToast from "../components/Notification";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppContext.Provider value={{ isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
