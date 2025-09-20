import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireSubscription?: boolean;
  adminOnly?: boolean;
  superAdminOnly?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireSubscription = false,
  adminOnly = false,
  superAdminOnly = false 
}: ProtectedRouteProps) => {
  const { user, profile, loading, hasActiveSubscription, isAdmin, isSuperAdmin, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Check super admin permission
  if (superAdminOnly && !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>
              Esta área é restrita apenas para super administradores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.history.back()} className="w-full">
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check admin permission
  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>
              Esta área é restrita apenas para administradores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.history.back()} className="w-full">
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check subscription
  if (requireSubscription && !hasActiveSubscription && !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
            <CardTitle>Assinatura Necessária</CardTitle>
            <CardDescription>
              Sua assinatura expirou ou foi suspensa. Entre em contato com o administrador para renovar o acesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile && (
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Status:</strong> {profile.subscription_status}</p>
                <p><strong>Plano:</strong> {profile.subscription_plan}</p>
                {profile.subscription_end_date && (
                  <p><strong>Expirou em:</strong> {new Date(profile.subscription_end_date).toLocaleDateString('pt-BR')}</p>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Button onClick={() => window.history.back()} className="w-full">
                Voltar
              </Button>
              <Button variant="outline" onClick={signOut} className="w-full">
                Sair do Sistema
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};