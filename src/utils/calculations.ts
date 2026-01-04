import { ExpenseItem, ExpenseStats, CategoryData, CATEGORY_COLORS, CATEGORY_NAMES } from '../types/expense';

export const calculateExpenseStats = (expenses: ExpenseItem[]): ExpenseStats => {
  if (expenses.length === 0) {
    return {
      totalAmount: 0,
      categoryTotals: {},
      categoryPercentages: {},
      averageAmount: 0,
      maxExpense: {} as ExpenseItem,
      minExpense: {} as ExpenseItem,
      itemCount: 0,
    };
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const categoryPercentages: Record<string, number> = {};
  Object.keys(categoryTotals).forEach(category => {
    categoryPercentages[category] = (categoryTotals[category] / totalAmount) * 100;
  });

  const averageAmount = totalAmount / expenses.length;
  
  const maxExpense = expenses.reduce((max, expense) => 
    expense.amount > max.amount ? expense : max
  );
  
  const minExpense = expenses.reduce((min, expense) => 
    expense.amount < min.amount ? expense : min
  );

  return {
    totalAmount,
    categoryTotals,
    categoryPercentages,
    averageAmount,
    maxExpense,
    minExpense,
    itemCount: expenses.length,
  };
};

export const getCategoryData = (expenses: ExpenseItem[]): CategoryData[] => {
  const stats = calculateExpenseStats(expenses);
  
  return Object.keys(stats.categoryTotals).map(category => ({
    category,
    categoryName: CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES],
    amount: stats.categoryTotals[category],
    percentage: stats.categoryPercentages[category],
    color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
    items: expenses.filter(expense => expense.category === category),
  })).sort((a, b) => b.amount - a.amount);
};

export const formatCurrency = (amount: number): string => {
  return `¥${amount.toLocaleString('zh-CN')}`;
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};