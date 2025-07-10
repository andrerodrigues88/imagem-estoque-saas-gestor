import { Button } from "@/components/ui/button";

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export const Header = ({ onNavigate, currentSection }: HeaderProps) => {
  return (
    <div className="w-full">
      {/* Header Principal */}
      <header className="bg-background border-b border-border px-6 py-4">
        <div className="flex justify-end items-center gap-4">
          <Button 
            variant={currentSection === 'quick-access' ? 'default' : 'outline'}
            onClick={() => onNavigate('quick-access')}
            className="bg-background border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            Acesso Rápido
          </Button>
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
        </div>
      </header>
      
      {/* Faixa Amarela */}
      <div className="w-full h-4 bg-primary"></div>
    </div>
  );
};