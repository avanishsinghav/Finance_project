import React, { useEffect, useState } from "react";
import { initialTransactions } from "./data";

import SummaryCards from "./Component/SummaryCards";
import Charts from "./Component/Charts";
import Transactions from "./Component/Transactions";
import Insights from "./Component/Insights";
import Navbar from "./Component/Navbar";
import Selector from "./Component/Selector";

const App = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer");
  const [activeTab, setActiveTab] = useState("transactions");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Role Selector */}
          <Selector
            role={role}
            setRole={setRole}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* Summary */}
          <SummaryCards transactions={transactions} />

          {/* Tabs */}
          <div className="flex gap-4 mt-8 border-b border-gray-300 dark:border-zinc-700 pb-2">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-4 py-2 rounded-t-md font-medium ${
                activeTab === "transactions"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-zinc-700"
              }`}
            >
              Transactions
            </button>

            <button
              onClick={() => setActiveTab("charts")}
              className={`px-4 py-2 rounded-t-md font-medium ${
                activeTab === "charts"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-zinc-700"
              }`}
            >
              Charts
            </button>

            <button
              onClick={() => setActiveTab("insights")}
              className={`px-4 py-2 rounded-t-md font-medium ${
                activeTab === "insights"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-zinc-700"
              }`}
            >
              Insights
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "transactions" && (
              <Transactions
                transactions={transactions}
                setTransactions={setTransactions}
                role={role}
              />
            )}

            {activeTab === "charts" && <Charts transactions={transactions} />}

            {activeTab === "insights" && (
              <Insights transactions={transactions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
