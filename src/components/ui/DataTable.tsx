import React, { useState, useMemo } from 'react';
import { ExpenseItem, CATEGORY_NAMES } from '../../types/expense';
import { formatCurrency } from '../../utils/calculations';

interface DataTableProps {
  data: ExpenseItem[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<keyof ExpenseItem>('amount');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;
    
    if (filterCategory !== 'all') {
      filtered = data.filter(item => item.category === filterCategory);
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [data, sortField, sortDirection, filterCategory]);

  const handleSort = (field: keyof ExpenseItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: keyof ExpenseItem) => {
    if (field !== sortField) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          详细支出清单
        </h3>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">筛选类别:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">全部</option>
            {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('category')}
              >
                类别 {getSortIcon('category')}
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('description')}
              >
                项目 {getSortIcon('description')}
              </th>
              <th 
                className="text-right py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('amount')}
              >
                金额 {getSortIcon('amount')}
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('date')}
              >
                日期 {getSortIcon('date')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((item, index) => (
              <tr 
                key={item.id} 
                className={`border-b border-gray-100 hover:bg-gray-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {CATEGORY_NAMES[item.category]}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-800">{item.description}</td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {formatCurrency(item.amount)}
                </td>
                <td className="py-3 px-4 text-gray-600">{item.date || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        共 {filteredAndSortedData.length} 项支出
      </div>
    </div>
  );
};