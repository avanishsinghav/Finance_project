import React from "react";

const Insights = ({ transactions }) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");

  const categoryTotals = {};

  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  let highestCategory = "";
  let highestAmount = 0;

  for (let c in categoryTotals) {
    if (categoryTotals[c] > highestAmount) {
      highestAmount = categoryTotals[c];
      highestCategory = c;
    }
  }

  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

  const avgExpense =
    expenses.length > 0 ? Math.round(totalExpense / expenses.length) : 0;

  const highestTransaction =
    expenses.length > 0 ? Math.max(...expenses.map((t) => t.amount)) : 0;

  const lowestTransaction =
    expenses.length > 0 ? Math.min(...expenses.map((t) => t.amount)) : 0;

  return (
    <div className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-6">Insights</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Transactions */}
        <div className="bg-gray-50 dark:bg-zinc-700 p-4 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Total Transactions
          </p>
          <h3 className="text-xl font-bold">{transactions.length}</h3>
        </div>

        {/* Total Income */}
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Total Income
          </p>
          <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
            ₹{totalIncome}
          </h3>
        </div>

        {/* Total Expense */}
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Total Expense
          </p>
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
            ₹{totalExpense}
          </h3>
        </div>

        {/* Highest Category */}
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Highest Spending Category
          </p>
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {highestCategory || "N/A"}
          </h3>
          <p>₹{highestAmount}</p>
        </div>

        {/* Average Expense */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Average Expense
          </p>
          <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
            ₹{avgExpense}
          </h3>
        </div>

        {/* Highest Transaction */}
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Highest Expense
          </p>
          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
            ₹{highestTransaction}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Insights;
