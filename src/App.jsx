import React from "react";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify-custom.css";
import { toast } from "react-toastify";
// import Testing from "./components/testing";

const App = () => {
  toast.success("Hello");
  return (
    <AppProvider>
      <Dashboard />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AppProvider>
  );
};

export default App;
