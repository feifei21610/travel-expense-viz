export interface ExpenseItem {
  id: string;
  category: '行' | '住' | '玩' | '衣' | '食';
  categoryName: string;
  description: string;
  amount: number;
  date?: string;
}

export interface ExpenseStats {
  totalAmount: number;
  categoryTotals: Record<string, number>;
  categoryPercentages: Record<string, number>;
  averageAmount: number;
  maxExpense: ExpenseItem;
  minExpense: ExpenseItem;
  itemCount: number;
}

export interface CategoryData {
  category: string;
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
  items: ExpenseItem[];
}

export const CATEGORY_COLORS = {
  '行': '#3B82F6', // 蓝色 - 交通
  '住': '#10B981', // 绿色 - 住宿
  '玩': '#F59E0B', // 黄色 - 娱乐
  '衣': '#8B5CF6', // 紫色 - 装备
  '食': '#EF4444', // 红色 - 餐饮
} as const;

export const CATEGORY_NAMES = {
  '行': '交通出行',
  '住': '住宿费用',
  '玩': '门票娱乐',
  '衣': '装备用品',
  '食': '餐饮消费',
} as const;