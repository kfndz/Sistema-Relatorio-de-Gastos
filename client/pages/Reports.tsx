import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function Reports() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
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

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="space-y-6">
          {/* Monthly Total */}
          <Card className="border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Total do Mês
            </h2>
            <div className="text-3xl font-bold text-accent">
              R$ 0,00
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Nenhum gasto registrado
            </p>
          </Card>

          {/* Expense by Category */}
          <Card className="border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Gastos por Categoria
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Gráfico de categorias aparecerá aqui quando houver dados</p>
            </div>
          </Card>

          {/* Expense by Person */}
          <Card className="border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Gastos por Pessoa
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Gráfico de pessoas aparecerá aqui quando houver dados</p>
            </div>
          </Card>

          {/* Period Filter */}
          <Card className="border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Filtro de Período
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Filtro de período aparecerá aqui</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
