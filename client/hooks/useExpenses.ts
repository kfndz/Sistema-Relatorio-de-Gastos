import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  user: string;
  description: string;
}

export const useExpenses = () => {
  const { user } = useAuth();

  const STORAGE_KEY = user
    ? `expenses_${user.id}`
    : 'expenses_guest';

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setIsLoading(false);
      return;
    }

    const loadExpenses = () => {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        try {
          setExpenses(JSON.parse(saved));
        } catch {
          localStorage.removeItem(STORAGE_KEY);
          setExpenses([]);
        }
      } else {
        setExpenses([]);
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

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [STORAGE_KEY, user]);

  const addExpense = useCallback(
    (expense: Expense) => {
      setExpenses((prev) => {
        const updated = [expense, ...prev];

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );

        return updated;
      });
    },
    [STORAGE_KEY]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => {
        const updated = prev.filter(
          (expense) => expense.id !== id
        );

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );

        return updated;
      });
    },
    [STORAGE_KEY]
  );

  const updateExpense = useCallback(
  (updatedExpense: Expense) => {
    setExpenses((prev) => {
      const updated = prev.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  },
  [STORAGE_KEY]
);

  return {
    expenses,
    isLoading,
    addExpense,
    deleteExpense,
    updateExpense,
  };
};