import React from "react";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify-custom.css";
import "./loading.css";
import { toast } from "react-toastify";

const App = () => {
  toast.error(
    "Backend hosting is currently unavailable. Please check out the GitHub repository: https://github.com/Preterno/FinGaze to run it locally."
  );
  return (
    <div>
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
    </div>
  );
};

export default App;
