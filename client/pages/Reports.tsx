import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";

import { useExpenses } from "@/hooks/useExpenses";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316",
];

export default function Reports() {
  const { expenses } = useExpenses();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const availableMonths = useMemo(() => {
    const months = [
      ...new Set(
        expenses.map((expense) => {
          const [year, month] = expense.date.split("-");

          return `${month}/${year}`;
        }),
      ),
    ];

    return months.sort((a, b) => {
      const [mA, yA] = a.split("/");
      const [mB, yB] = b.split("/");

      return (
        new Date(Number(yB), Number(mB) - 1).getTime() -
        new Date(Number(yA), Number(mA) - 1).getTime()
      );
    });
  }, [expenses]);

  const currentMonth = (() => {
    const now = new Date();

    return `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
  })();

  const [selectedMonth, setSelectedMonth] = useState(
    availableMonths[0] || currentMonth,
  );

  const filteredExpenses = useMemo(() => {
    if (!selectedMonth) return expenses;

    const [month, year] = selectedMonth.split("/");

    return expenses.filter((expense) => {
      const [expenseYear, expenseMonth] = expense.date.split("-");

      return (
        expenseYear === year &&
        expenseMonth === month
      );
    });
  }, [expenses, selectedMonth]);

  const totalMonth = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const categoryData = Object.entries(
    filteredExpenses.reduce(
      (acc, expense) => {
        acc[expense.category] =
          (acc[expense.category] || 0) + expense.amount;

        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));

  const personData = Object.entries(
    filteredExpenses.reduce(
      (acc, expense) => {
        acc[expense.user] =
          (acc[expense.user] || 0) + expense.amount;

        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));

  const dailyData = useMemo(() => {
    const grouped: Record<string, number> = {};

    filteredExpenses.forEach((expense) => {
      grouped[expense.date] =
        (grouped[expense.date] || 0) + expense.amount;
    });

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => ({
        date: new Date(date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
        }),
        value,
      }));
  }, [filteredExpenses]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>

            <h1 className="text-2xl font-bold text-foreground">
              Relatórios
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="space-y-6">

          <Card className="border-border bg-card p-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted-foreground">
                Mês analisado
              </label>

              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(e.target.value)
                }
                className="border rounded-md bg-background p-2"
              >
                {availableMonths.map((month) => (
                  <option
                    key={month}
                    value={month}
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Total do Mês
            </h2>

            <div className="text-4xl font-bold text-accent">
              {formatCurrency(totalMonth)}
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              {filteredExpenses.length} gasto(s) registrado(s)
            </p>
          </Card>

          {dailyData.length > 0 && (
            <Card className="border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Gastos por Dia
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />

                  <Tooltip
                    formatter={(value: number) =>
                      formatCurrency(value)
                    }
                  />

                  <Bar
                    dataKey="value"
                    fill="hsl(var(--accent))"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}

          {categoryData.length > 0 && (
            <Card className="border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Gastos por Categoria
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      outerRadius={100}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index % COLORS.length
                            ]
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value: number) =>
                        formatCurrency(value)
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-2">
                  {categoryData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              COLORS[
                                index % COLORS.length
                              ],
                          }}
                        />

                        <span className="text-sm font-medium">
                          {item.name}
                        </span>
                      </div>

                      <span className="font-semibold">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {personData.length > 0 && (
            <Card className="border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Gastos por Pessoa
              </h2>

              <div className="space-y-3">
                {personData.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1">
                      <span>{item.name}</span>

                      <span className="font-semibold text-accent">
                        {formatCurrency(item.value)}
                      </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{
                          width: `${
                            (item.value /
                              Math.max(
                                ...personData.map(
                                  (p) => p.value,
                                ),
                              )) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {filteredExpenses.length === 0 && (
            <Card className="border-dashed border-border bg-card/50 p-8 text-center">
              <p className="text-muted-foreground">
                Nenhum gasto encontrado para este mês.
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}