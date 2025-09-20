import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut, Shield, Crown } from "lucide-react";

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export const Header = ({ onNavigate, currentSection }: HeaderProps) => {
  const { profile, signOut, isSuperAdmin, isAdmin } = useAuth();

  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleIcon = () => {
    if (isSuperAdmin) return <Crown className="h-4 w-4" />;
    if (isAdmin) return <Shield className="h-4 w-4" />;
    return <User className="h-4 w-4" />;
  };

  return (
    <div className="w-full">
      {/* Header Principal */}
      <header className="bg-background border-b border-border px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary">Sistema de Gestão</h1>
            {profile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {getRoleIcon()}
                <span>
                  {profile.role === 'super_admin' && 'Super Admin'}
                  {profile.role === 'admin' && 'Administrador'}
                  {profile.role === 'user' && 'Usuário'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant={currentSection === 'controle' ? 'default' : 'outline'}
              onClick={() => onNavigate('controle')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Controle
            </Button>
            <Button 
              variant={currentSection === 'dashboard' ? 'default' : 'outline'}
              onClick={() => onNavigate('dashboard')}
              className="bg-background border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              Dashboard
            </Button>
            
            {isSuperAdmin && (
              <Button 
                variant={currentSection === 'admin' ? 'default' : 'outline'}
                onClick={() => onNavigate('admin')}
                className="bg-background border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials(profile?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{profile?.name || 'Usuário'}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {profile?.subscription_status === 'active' ? 'Assinatura Ativa' : 'Assinatura Inativa'}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Faixa Amarela */}
      <div className="w-full h-4 bg-primary"></div>
    </div>
  );
};