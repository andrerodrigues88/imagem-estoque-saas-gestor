import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const EntradasTab = () => {
  const entradas = [
    {
      codigo: 1,
      produto: "Pastilha de Freios",
      quantidadeEntrada: 50,
      unidadeMedida: "Uni",
      dataCompra: "01/01/25",
      valorUnitario: "R$ 15,00",
      valorTotal: "R$ 750,00",
      fornecedor: "",
      notaFiscal: "",
      mes: "Jan",
      ano: "2025"
    },
    {
      codigo: 2,
      produto: "Óleo de freios",
      quantidadeEntrada: 30,
      unidadeMedida: "Uni",
      dataCompra: "01/01/25",
      valorUnitario: "R$ 10,00",
      valorTotal: "R$ 300,00",
      fornecedor: "",
      notaFiscal: "",
      mes: "Jan",
      ano: "2025"
    },
    {
      codigo: 3,
      produto: "Correia",
      quantidadeEntrada: 0,
      unidadeMedida: "0",
      dataCompra: "",
      valorUnitario: "R$ 0,00",
      valorTotal: "R$ 0,00",
      fornecedor: "",
      notaFiscal: "",
      mes: "Jan",
      ano: "1900"
    },
    {
      codigo: 4,
      produto: "Pastilha de Freios",
      quantidadeEntrada: 70,
      unidadeMedida: "Uni",
      dataCompra: "30/06/25",
      valorUnitario: "R$ 10,00",
      valorTotal: "R$ 700,00",
      fornecedor: "Fornecedor 1",
      notaFiscal: "",
      mes: "Jun",
      ano: "2025"
    }
  ];

  return (
    <div className="p-6">
      <Card className="bg-secondary p-6 border-none">
        <div className="grid grid-cols-11 gap-2 mb-6 text-sm">
          <div>
            <label className="block text-primary font-medium mb-2">Código</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {entradas.map((item) => (
                  <SelectItem key={item.codigo} value={item.codigo.toString()}>
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
                {entradas.map((item, index) => (
                  <SelectItem key={index} value={item.produto}>
                    {item.produto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-primary font-medium mb-2">Quantidade de Entrada</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {entradas.map((item, index) => (
                  <SelectItem key={index} value={item.quantidadeEntrada.toString()}>
                    {item.quantidadeEntrada}
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
            <label className="block text-primary font-medium mb-2">Data de Compra</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {entradas.filter(item => item.dataCompra).map((item, index) => (
                  <SelectItem key={index} value={item.dataCompra}>
                    {item.dataCompra}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-primary font-medium mb-2">Valor Unitário de Compra</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {entradas.map((item, index) => (
                  <SelectItem key={index} value={item.valorUnitario}>
                    {item.valorUnitario}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Valor Total de Compra</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {entradas.map((item, index) => (
                  <SelectItem key={index} value={item.valorTotal}>
                    {item.valorTotal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Fornecedor</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fornecedor1">Fornecedor 1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Nº Nota Fiscal</label>
            <Select>
              <SelectTrigger className="bg-muted border-border h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">-</SelectItem>
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
              {entradas.map((item, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-1 text-foreground w-8">{item.codigo}</td>
                  <td className="py-1 text-foreground">{item.produto}</td>
                  <td className="py-1 text-foreground text-center">{item.quantidadeEntrada}</td>
                  <td className="py-1 text-foreground text-center">{item.unidadeMedida}</td>
                  <td className="py-1 text-foreground">{item.dataCompra || "-"}</td>
                  <td className="py-1 text-foreground">{item.valorUnitario}</td>
                  <td className="py-1 text-foreground">{item.valorTotal}</td>
                  <td className="py-1 text-foreground">{item.fornecedor || "-"}</td>
                  <td className="py-1 text-foreground">{item.notaFiscal || "-"}</td>
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