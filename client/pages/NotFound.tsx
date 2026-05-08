import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="border-border bg-card p-8 max-w-md w-full text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="text-lg text-muted-foreground">Página não encontrada</p>
        <p className="text-sm text-muted-foreground">
          A página que você está procurando não existe.
        </p>
        <Link to="/" className="block">
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Voltar para Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
