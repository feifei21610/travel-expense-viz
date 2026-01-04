import React, { useMemo } from 'react';
import { PieChart } from './components/charts/PieChart';
import { BarChart } from './components/charts/BarChart';
import { DataTable } from './components/ui/DataTable';
import { StatsPanel } from './components/ui/StatsPanel';
import { travelExpenseData } from './data/travelData';
import { calculateExpenseStats, getCategoryData } from './utils/calculations';

function App() {
  const stats = useMemo(() => calculateExpenseStats(travelExpenseData), []);
  const categoryData = useMemo(() => getCategoryData(travelExpenseData), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              🎿 旅游花费分析报告
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              详细的支出统计与可视化分析
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Panel */}
        <StatsPanel stats={stats} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PieChart data={categoryData} />
          <BarChart data={categoryData} />
        </div>

        {/* Category Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {categoryData.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{category.categoryName}</h4>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">
                  ¥{category.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  占比 {category.percentage.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">
                  {category.items.length} 项支出
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <DataTable data={travelExpenseData} />

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 旅游花费分析系统 - 数据可视化报告</p>
        </footer>
      </main>
    </div>
  );
}

export default App;