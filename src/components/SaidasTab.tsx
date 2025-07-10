import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SaidasTab = () => {
  const saidas = [
    {
      codigo: 1,
      produto: "Pastilha de Freios",
      quantidadeSaida: 15,
      tipoSaida: "Venda",
      dataSaida: "10/01/25",
      unidadeMedida: "Uni",
      valorUnitario: "R$ 30,00",
      valorTotal: "R$ 450,00",
      mes: "Jan",
      ano: "2025"
    },
    {
      codigo: 2,
      produto: "Óleo de freios",
      quantidadeSaida: 0,
      tipoSaida: "",
      dataSaida: "",
      unidadeMedida: "Uni",
      valorUnitario: "R$ 0,00",
      valorTotal: "R$ 0,00",
      mes: "Jan",
      ano: "1900"
    },
    {
      codigo: 1,
      produto: "Pastilha de Freios",
      quantidadeSaida: 30,
      tipoSaida: "Venda",
      dataSaida: "30/06/25",
      unidadeMedida: "Uni",
      valorUnitario: "R$ 20,00",
      valorTotal: "R$ 600,00",
      mes: "Jun",
      ano: "2025"
    }
  ];

  return (
    <div className="p-6">
      <Card className="bg-secondary p-6 border-none">
        <div className="grid grid-cols-9 gap-2 mb-6 text-sm">
          <div>
            <label className="block text-primary font-medium mb-2">Código</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {saidas.map((item, index) => (
                  <SelectItem key={index} value={item.codigo.toString()}>
                    {item.codigo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Produto</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {saidas.map((item, index) => (
                  <SelectItem key={index} value={item.produto}>
                    {item.produto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-primary font-medium mb-2">Quantidade de Saída</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {saidas.map((item, index) => (
                  <SelectItem key={index} value={item.quantidadeSaida.toString()}>
                    {item.quantidadeSaida}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Tipo de Saída</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="venda">Venda</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Data de Saída</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {saidas.filter(item => item.dataSaida).map((item, index) => (
                  <SelectItem key={index} value={item.dataSaida}>
                    {item.dataSaida}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Unidade de Medida</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uni">Uni</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-primary font-medium mb-2">Valor Unitário de Venda</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {saidas.map((item, index) => (
                  <SelectItem key={index} value={item.valorUnitario}>
                    {item.valorUnitario}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Valor Total de Venda</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {saidas.map((item, index) => (
                  <SelectItem key={index} value={item.valorTotal}>
                    {item.valorTotal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Mês</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan">Jan</SelectItem>
                <SelectItem value="jun">Jun</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Ano</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1900">1900</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {saidas.map((item, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-1 text-foreground w-8">{item.codigo}</td>
                  <td className="py-1 text-foreground">{item.produto}</td>
                  <td className="py-1 text-foreground text-center">{item.quantidadeSaida}</td>
                  <td className="py-1 text-foreground">{item.tipoSaida || "-"}</td>
                  <td className="py-1 text-foreground">{item.dataSaida || "-"}</td>
                  <td className="py-1 text-foreground text-center">{item.unidadeMedida}</td>
                  <td className="py-1 text-foreground">{item.valorUnitario}</td>
                  <td className="py-1 text-foreground">{item.valorTotal}</td>
                  <td className="py-1 text-foreground">{item.mes}</td>
                  <td className="py-1 text-foreground">{item.ano}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};