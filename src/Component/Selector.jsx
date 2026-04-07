import React from "react";

const Selector = ({ role, setRole, darkMode, setDarkMode }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Role Selector */}
      <div className="max-w-sm">
        <label className="block text-lg font-bold mb-2">Select Role</label>

        <select
          value={role}
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 
          rounded-lg shadow-sm bg-white dark:bg-zinc-800
          focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Dark Mode Toggle */}
      <div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-yellow-400 dark:text-black"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </div>
  );
};

export default Selector;
