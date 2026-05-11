import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TrendingDown, Calendar, User, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useExpenses, type Expense } from '@/hooks/useExpenses';
import { parseExpense } from '@/utils/expenseParser';

export default function Index() {
  const { user } = useAuth();
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parsed = parseExpense(input);
    const newExpense: Expense = {
      id: Date.now().toString(),
      category: parsed.category,
      amount: parsed.amount,
      date: parsed.date,
      user: user?.username || 'Usuário',
      description: parsed.description,
    };

    addExpense(newExpense);
    setInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const todayExpenses = expenses
    .filter(e => e.date === new Date().toISOString().split('T')[0])
    .reduce((sum, e) => sum + e.amount, 0);

  const monthExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Gastos</h1>
            <div className="flex gap-2">
              <Link to="/reports">
                <Button variant="ghost" size="sm" className="gap-2">
                  <TrendingDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Relatórios</span>
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Perfil</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Input Section */}
        <div className="mb-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Registre um gasto
            </label>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="ex: uber 27 hoje"
                value={input}
                onChange={handleInputChange}
                className="flex-1 text-base"
                autoFocus
              />
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                Enviar
              </Button>
            </form>
          </div>
          <p className="text-xs text-muted-foreground">
            Exemplos: "uber 27", "cinema 39 reais", "mercado ontem 150"
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Card className="border-border bg-card p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Hoje</p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(todayExpenses)}
              </p>
            </div>
          </Card>
          <Card className="border-border bg-card p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Este mês</p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(monthExpenses)}
              </p>
            </div>
          </Card>
          <Card className="border-border bg-card p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-accent">
                {formatCurrency(monthExpenses)}
              </p>
            </div>
          </Card>
        </div>

        {/* Expenses List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Gastos recentes
          </h2>
          {expenses.length === 0 ? (
            <Card className="border-dashed border-border bg-card/50 p-8 text-center">
              <p className="text-muted-foreground">
                Nenhum gasto registrado ainda
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Comece digitando um gasto acima
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {expenses.map((expense) => (
                <Card
                  key={expense.id}
                  className="border-border bg-card p-4 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {expense.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {expense.user}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {expense.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(expense.date)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <p className="font-semibold text-lg text-foreground">
                        {formatCurrency(expense.amount)}
                      </p>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                        title="Deletar gasto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
