import React from 'react';
import { ExpenseStats } from '../../types/expense';
import { formatCurrency } from '../../utils/calculations';

interface StatsPanelProps {
  stats: ExpenseStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const statCards = [
    {
      title: '总支出',
      value: formatCurrency(stats.totalAmount),
      icon: '💰',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: '平均支出',
      value: formatCurrency(stats.averageAmount),
      icon: '📊',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: '最高单项',
      value: formatCurrency(stats.maxExpense?.amount || 0),
      icon: '📈',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      subtitle: stats.maxExpense?.description,
    },
    {
      title: '最低单项',
      value: formatCurrency(stats.minExpense?.amount || 0),
      icon: '📉',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      subtitle: stats.minExpense?.description,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className={`${card.color} p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">{card.title}</p>
                <p className="text-white text-2xl font-bold">{card.value}</p>
                {card.subtitle && (
                  <p className="text-white/70 text-xs mt-1 truncate">
                    {card.subtitle}
                  </p>
                )}
              </div>
              <div className="text-3xl opacity-80">{card.icon}</div>
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-500">
              {index === 0 && `共 ${stats.itemCount} 项支出`}
              {index === 1 && '每项平均金额'}
              {index === 2 && '单项最高消费'}
              {index === 3 && '单项最低消费'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};