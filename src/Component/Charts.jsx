import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#00c49f",
  "#ffbb28",
];

const Charts = ({ transactions }) => {
  const expenseData = Object.values(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = { name: t.category, value: 0 };
        }

        acc[t.category].value += t.amount;

        return acc;
      }, {}),
  );

  const trendData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-10 mb-10">
      {/* Pie Chart */}
      <div className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Spending by Category</h3>

        <PieChart width={350} height={300}>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >
            {expenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Transaction Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" />

            <XAxis
              dataKey="date"
              interval={0}
              angle={-30}
              textAnchor="end"
              tick={{ fontSize: 10, fill: "#9ca3af" }}
            />

            <YAxis tick={{ fill: "#9ca3af" }} />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#3b82f6"
              barSize={35}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
