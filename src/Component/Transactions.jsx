import React, { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";

const Transactions = ({ transactions, setTransactions, role }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortKey, setSortKey] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });

  // Filtering
  let filtered = transactions.filter((t) => {
    const matchSearch = t.category.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" ? true : t.type === typeFilter;

    return matchSearch && matchType;
  });

  // Sorting
  if (sortKey === "date") {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
  }

  if (sortKey === "amount") {
    filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount),
    };

    setTransactions([...transactions, newTransaction]);

    // Reset
    setFormData({
      date: "",
      category: "",
      amount: "",
      type: "expense",
    });
    setShowForm(false);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow mb-10">
      {/* Search + Filter */}
      <div className="flex gap-4 mb-4">
        {/* Search */}
        <div className="relative w-full">
          <FaSearchPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" />

          <input
            type="text"
            placeholder="Search by category"
            className="w-full border border-gray-300 dark:border-zinc-600 
            bg-white dark:bg-zinc-700
            rounded-xl py-2 pl-10 pr-4 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            text-gray-800 dark:text-white"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        <select
          className="border border-gray-300 dark:border-zinc-600 
          bg-white dark:bg-zinc-700 
          text-gray-800 dark:text-white
          rounded-xl px-4"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Title + Sort + Add */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>

        {/* Sorting Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortKey("")}
            className={`px-3 py-1 rounded border dark:border-zinc-600 ${
              sortKey === "" ? "bg-blue-500 text-white" : ""
            }`}
          >
            No Sort
          </button>

          <button
            onClick={() => setSortKey("date")}
            className={`px-3 py-1 rounded border dark:border-zinc-600 ${
              sortKey === "date" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Sort by Date
          </button>

          <button
            onClick={() => setSortKey("amount")}
            className={`px-3 py-1 rounded border dark:border-zinc-600 ${
              sortKey === "amount" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Sort by Amount
          </button>
        </div>

        {/* Buttons */}
        {role === "viewer" && (
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Import to CSV
          </button>
        )}

        {role === "admin" && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 p-5 rounded-xl border 
    bg-white dark:bg-zinc-800 
    border-gray-300 dark:border-zinc-600 
    shadow-sm"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-300 dark:border-zinc-600 
        bg-white dark:bg-zinc-700 
        text-gray-800 dark:text-white
        p-2 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Category */}
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 dark:border-zinc-600 
        bg-white dark:bg-zinc-700 
        text-gray-800 dark:text-white
        p-2 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Amount */}
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border border-gray-300 dark:border-zinc-600 
        bg-white dark:bg-zinc-700 
        text-gray-800 dark:text-white
        p-2 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Type Select */}
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`border border-gray-300 dark:border-zinc-600 
        bg-white dark:bg-zinc-700 
        p-2 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        
        ${
          formData.type === "income"
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }
        `}
            >
              {/* IMPORTANT: force readable text */}
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 
        text-white px-4 py-2 rounded-lg transition"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-400 hover:bg-gray-500 
        text-white px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Type</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr
              key={t.id}
              className="text-center hover:bg-gray-50 dark:hover:bg-zinc-700"
            >
              <td className="p-2">{t.date}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">₹{t.amount}</td>

              <td
                className={`p-2 font-medium ${
                  t.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {t.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
