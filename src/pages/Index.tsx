import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { EstoqueTab } from "@/components/EstoqueTab";
import { FornecedoresTab } from "@/components/FornecedoresTab";
import { EntradasTab } from "@/components/EntradasTab";
import { SaidasTab } from "@/components/SaidasTab";
import { Dashboard } from "@/components/Dashboard";
import { AdminPanel } from "@/components/AdminPanel";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { isSuperAdmin } = useAuth();
  const [currentSection, setCurrentSection] = useState('controle');
  const [activeTab, setActiveTab] = useState('estoque');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (currentSection === 'dashboard') {
      return <Dashboard />;
    }

    if (currentSection === 'admin' && isSuperAdmin) {
      return <AdminPanel />;
    }

    switch (activeTab) {
      case 'estoque':
        return <EstoqueTab />;
      case 'fornecedores':
        return <FornecedoresTab />;
      case 'entradas':
        return <EntradasTab />;
      case 'saidas':
        return <SaidasTab />;
      default:
        return <EstoqueTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onNavigate={handleNavigate} 
        currentSection={currentSection} 
      />
      
      {currentSection !== 'dashboard' && currentSection !== 'admin' && (
        <Navigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      )}
      
      <main className="w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
