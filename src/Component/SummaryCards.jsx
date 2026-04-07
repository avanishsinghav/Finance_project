import React from "react";

const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Balance Card */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow text-gray-800 dark:text-gray-100">
        <h3 className="text-gray-500 dark:text-gray-400">Balance</h3>
        <p className="text-2xl font-bold">₹{balance}</p>
      </div>

      {/* Income Card */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow text-gray-800 dark:text-gray-100">
        <h3 className="text-gray-500 dark:text-gray-400">Income</h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          ₹{income}
        </p>
      </div>

      {/* Expense Card */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow text-gray-800 dark:text-gray-100">
        <h3 className="text-gray-500 dark:text-gray-400">Expenses</h3>
        <p className="text-2xl font-bold text-red-500 dark:text-red-400">
          ₹{expenses}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
