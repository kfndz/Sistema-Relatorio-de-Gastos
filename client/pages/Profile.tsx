import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
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
            <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="border-border bg-card p-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="w-10 h-10 text-accent" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">
                  {user?.name}
                </h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </Card>

          {/* Profile Information */}
          <Card className="border-border bg-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Nome
              </label>
              <div className="bg-muted/30 px-3 py-2 rounded-md text-foreground">
                {user?.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Email
              </label>
              <div className="bg-muted/30 px-3 py-2 rounded-md text-foreground">
                {user?.email}
              </div>
            </div>
          </Card>

          {/* Photo */}
          <Card className="border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Foto do Perfil</h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Você pode adicionar uma foto do perfil aqui
              </p>
              <Button variant="outline" className="w-full">
                Carregar Foto
              </Button>
            </div>
          </Card>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
            size="lg"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </main>
    </div>
  );
}
