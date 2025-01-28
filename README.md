# FinGaze

The **FinGaze** Portfolio Tracker frontend is a responsive web application that enables users to manage their stock portfolio effectively. It allows users to add, view, edit, and delete stock holdings, view top-performing stocks, and visualize portfolio growth through interactive charts.

## Features

* **Stock List**: Displays all stock holdings, including the current price of each stock. Supports adding, editing, and deleting stocks.
* **Top Performers**: Highlights the top 5 stocks based on percentage growth.
* **Portfolio Growth Chart**: Visualizes the portfolio's growth over 7 days, 1 month, and 3 months using dynamic charts.

## Technologies and Libraries

* **Frontend Framework**: React.js with functional components and hooks.
* **Styling**: Tailwind CSS for modern, responsive design.
* **Notifications**: React-Toastify for toast notifications.
* **Animations**: Framer Motion for dynamic animations.
* **Charts**: Recharts for data visualization.

## Backend

The frontend communicates with the following backends:

1. **FinGaze Backend (Spring Boot):**
   * Handles CRUD operations for stocks, portfolio calculations, and top-performing stocks.
   * Repository: [FinGaze Backend](https://github.com/Preterno/FinGaze-Backend)
2. **StockDataAPI (Flask API):**
   * Provides real-time stock price data and portfolio growth calculations.
   * Repository: [StockDataAPI](https://github.com/Preterno/StockDataAPI)

**Note**: To ensure the application functions correctly, **both the Spring Boot backend and Flask API must be running**. Instructions for their installation can be found in their respective repositories.

## Installation and Setup

1. **Clone the Repository**:

```bash
git clone https://github.com/Preterno/FinGaze.git
cd FinGaze
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Set Environment Variables**: Create a `.env` file in the project root and add:

```env
VITE_API_BASE_URL=http://localhost:8080/
```

4. **Run the Application**:

```bash
npm run dev
```

5. **Access the App**: Open your browser and navigate to:

```arduino
http://localhost:5173/
```

## Connect with Me

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/aslam8483).
