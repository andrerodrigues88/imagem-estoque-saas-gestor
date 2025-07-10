import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'estoque', label: 'Estoque' },
    { id: 'fornecedores', label: 'Fornecedores' },
    { id: 'entradas', label: 'Entradas' },
    { id: 'saidas', label: 'Saídas' },
  ];

  return (
    <div className="flex gap-4 p-6 bg-background">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'outline'}
          onClick={() => onTabChange(tab.id)}
          className={
            activeTab === tab.id
              ? 'bg-secondary text-foreground px-8 py-3 rounded-lg'
              : 'bg-background border-primary text-foreground hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg'
          }
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};