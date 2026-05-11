import { useState, useEffect, useCallback } from 'react';

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  user: string;
  description: string;
}

const STORAGE_KEY = 'expenses';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExpenses = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setExpenses(JSON.parse(saved));
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
      setIsLoading(false);
    };

    loadExpenses();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setExpenses(JSON.parse(e.newValue));
        } catch {
          setExpenses([]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addExpense = useCallback((expense: Expense) => {
    setExpenses((prev) => {
      const updated = [expense, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    expenses,
    isLoading,
    addExpense,
    deleteExpense,
  };
};
