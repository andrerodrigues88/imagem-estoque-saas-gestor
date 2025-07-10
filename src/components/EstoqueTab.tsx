import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const EstoqueTab = () => {
  const estoque = [
    { codigo: 2, produto: "Óleo de freios", qtdAtualizada: 30, estoqueMinimo: 150, estoqueMaximo: 300, classificacao: 0, situacao: "Atenção" },
    { codigo: 1, produto: "Pastilha de Freios", qtdAtualizada: 50, estoqueMinimo: 100, estoqueMaximo: 200, classificacao: 0, situacao: "Normal" },
    { codigo: 3, produto: "Correia", qtdAtualizada: 20, estoqueMinimo: 80, estoqueMaximo: 150, classificacao: 0, situacao: "Crítico" },
    { codigo: 4, produto: "Pastilha de Freios", qtdAtualizada: 70, estoqueMinimo: 100, estoqueMaximo: 200, classificacao: 0, situacao: "Normal" },
  ];

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'Crítico': return 'bg-destructive text-destructive-foreground';
      case 'Atenção': return 'bg-warning text-warning-foreground';
      default: return 'bg-success text-success-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Controle de Estoque Card */}
      <Card className="bg-secondary p-6 border-none">
        <h2 className="text-xl font-bold text-primary mb-6">Controle de Estoque</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-medium">Código</th>
                <th className="text-left py-2 text-foreground font-medium">Produto</th>
                <th className="text-left py-2 text-foreground font-medium">Quantidade Atualizada</th>
                <th className="text-left py-2 text-foreground font-medium">Estoque Mínimo</th>
                <th className="text-left py-2 text-foreground font-medium">Estoque Máximo</th>
                <th className="text-left py-2 text-foreground font-medium">Classificação</th>
                <th className="text-left py-2 text-foreground font-medium">Situação</th>
              </tr>
            </thead>
            <tbody>
              {estoque.map((item, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3 text-foreground">{item.codigo}</td>
                  <td className="py-3 text-foreground">{item.produto}</td>
                  <td className="py-3 text-foreground">{item.qtdAtualizada}</td>
                  <td className="py-3 text-foreground">{item.estoqueMinimo}</td>
                  <td className="py-3 text-foreground">{item.estoqueMaximo}</td>
                  <td className="py-3 text-foreground">{item.classificacao}</td>
                  <td className="py-3">
                    <Badge className={getSituacaoColor(item.situacao)}>
                      {item.situacao}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Gráfico de Óleo de freios */}
      <Card className="bg-secondary p-6 border-none">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Óleo de freios</h3>
        
        <div className="flex justify-center items-end h-64 gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-primary h-8 w-16 flex items-center justify-center text-xs font-bold text-primary-foreground">
              30
            </div>
            <span className="text-xs text-muted-foreground mt-2">Quantidade Atualizada</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary h-32 w-16 flex items-center justify-center text-xs font-bold text-primary-foreground">
              150
            </div>
            <span className="text-xs text-muted-foreground mt-2">Estoque Mínimo</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary h-48 w-16 flex items-center justify-center text-xs font-bold text-primary-foreground">
              300
            </div>
            <span className="text-xs text-muted-foreground mt-2">Estoque Máximo</span>
          </div>
        </div>
      </Card>
    </div>
  );
};