import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FornecedoresTab = () => {
  const fornecedores = [
    {
      nome: "Fornecedor 1",
      cnpj: "52137054/0001-05",
      endereco: "Rua Edmundo Alberta Mercer",
      telefone: "(81)99999-2929",
      email: "joanadasilva@hotmail.com"
    },
    {
      nome: "Fornecedor 2",
      cnpj: "",
      endereco: "",
      telefone: "",
      email: ""
    },
    {
      nome: "Fornecedor 3",
      cnpj: "",
      endereco: "",
      telefone: "",
      email: ""
    }
  ];

  return (
    <div className="p-6">
      <Card className="bg-secondary p-6 border-none">
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-foreground font-medium mb-2">Fornecedores</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {fornecedores.map((fornecedor, index) => (
                  <SelectItem key={index} value={fornecedor.nome}>
                    {fornecedor.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">CNPJ</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cnpj1">52137054/0001-05</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Endereço</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="endereco1">Rua Edmundo Alberta Mercer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">Telefone</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telefone1">(81)99999-2929</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">E-mail</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email1">joanadasilva@hotmail.com</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {fornecedores.map((fornecedor, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-2 text-foreground font-medium w-32">{fornecedor.nome}</td>
                  <td className="py-2 text-foreground">{fornecedor.cnpj || "-"}</td>
                  <td className="py-2 text-foreground">{fornecedor.endereco || "-"}</td>
                  <td className="py-2 text-foreground">{fornecedor.telefone || "-"}</td>
                  <td className="py-2 text-foreground">{fornecedor.email || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};