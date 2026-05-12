import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export default function Reports() {
  const { expenses } = useExpenses();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Gastos por categoria
  const categoryData = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

  // Gastos por pessoa
  const personData = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.user] = (acc[exp.user] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

  // Gastos por dia (últimos 7 dias)
const last7Days = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));

  return date.toLocaleDateString('sv-SE', {
    timeZone: 'America/Cuiaba',
  });
});

  const dailyData = last7Days.map((date) => ({
    date: new Date(date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    value: parseFloat(
      expenses
        .filter((exp) => exp.date === date)
        .reduce((sum, exp) => sum + exp.amount, 0)
        .toFixed(2)
    ),
  }));

  const totalMonth = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="space-y-6">
          {/* Monthly Total */}
          <Card className="border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Total do Mês
            </h2>
            <div className="text-4xl font-bold text-accent">
              {formatCurrency(totalMonth)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {expenses.length} gasto(s) registrado(s)
            </p>
          </Card>

          {/* Daily Chart */}
          {dailyData.some(d => d.value > 0) && (
            <Card className="border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Gastos dos Últimos 7 Dias
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Expense by Category */}
          {categoryData.length > 0 && (
            <Card className="border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Gastos por Categoria
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {categoryData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium text-foreground">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Expense by Person */}
          {personData.length > 0 && (
            <Card className="border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Gastos por Pessoa
              </h2>
              <div className="space-y-3">
                {personData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="text-sm font-semibold text-accent">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2 transition-all"
                        style={{
                          width: `${(item.value / Math.max(...personData.map(p => p.value))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Empty State */}
          {expenses.length === 0 && (
            <Card className="border-dashed border-border bg-card/50 p-8 text-center">
              <p className="text-muted-foreground">
                Nenhum gasto registrado ainda
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Registre seus gastos na tela inicial para ver os relatórios
              </p>
              <Link to="/" className="block mt-4">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Voltar para Home
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
