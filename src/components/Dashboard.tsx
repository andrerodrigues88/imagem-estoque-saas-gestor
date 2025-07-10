import { Card } from "@/components/ui/card";

export const Dashboard = () => {
  const metrics = [
    { label: "Total de Produtos", value: "3" },
    { label: "Quantidade Total", value: "105" },
    { label: "Quantidade Total Exportada", value: "0" },
    { label: "Valor Total Estoque", value: "R$ 1.030" },
    { label: "Valor Total Vendido", value: "R$ 1.050,00" },
    { label: "Valor Total Comprado", value: "R$ 1.750,00" },
    { label: "Receita Total", value: "-R$ 700,00" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Métricas Hexagonais */}
      <div className="flex justify-center items-center gap-2 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="relative bg-secondary p-4 flex flex-col items-center justify-center text-center min-h-[120px] min-w-[140px]"
            style={{
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
            }}
          >
            <div className="text-primary font-bold text-lg mb-1">
              {metric.value}
            </div>
            <div className="text-foreground text-xs font-medium leading-tight">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Área de Informações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card de Informações */}
        <Card className="bg-secondary p-6 border-none">
          <div className="text-foreground text-sm leading-relaxed space-y-2">
            <p>Este forma representa uma dados da coleta de gestão das dependencias de dados de todas as suas vendas em 1.excel</p>
            <p>Sua forma e tem dados específicos em uma versão do tempo de trabalho na linha e em cada 2.000 são informes, e dependencia de dados são juntos preestabelecido.</p>
          </div>
        </Card>

        {/* Gráfico de Entradas x Saídas */}
        <Card className="bg-secondary p-6 border-none">
          <h3 className="text-foreground font-semibold mb-4 text-center">Entradas x Saídas</h3>
          
          <div className="relative h-48">
            {/* Eixo Y */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
              <span>12</span>
              <span>10</span>
              <span>8</span>
              <span>6</span>
              <span>4</span>
              <span>2</span>
              <span>0</span>
            </div>
            
            {/* Eixo X */}
            <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>200</span>
              <span>400</span>
              <span>600</span>
              <span>800</span>
              <span>1000</span>
              <span>1200</span>
            </div>
            
            {/* Linhas do gráfico */}
            <div className="absolute left-8 bottom-8 right-4 top-4">
              {/* Linha de Entradas (amarela) */}
              <div className="absolute w-full h-0.5 bg-primary" style={{ bottom: '60%' }}></div>
              
              {/* Linha de Saídas (verde) */}
              <div className="absolute w-full h-0.5 bg-success" style={{ bottom: '40%' }}></div>
            </div>
            
            {/* Legenda */}
            <div className="absolute bottom-0 right-0 flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-primary"></div>
                <span className="text-foreground">Qtde entradas</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-success"></div>
                <span className="text-foreground">Qtde saídas</span>
              </div>
            </div>
            
            {/* Valores nas extremidades */}
            <div className="absolute right-0 text-xs text-foreground">
              <div style={{ bottom: '60%' }} className="absolute right-0">600</div>
              <div style={{ bottom: '40%' }} className="absolute right-0">400</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};