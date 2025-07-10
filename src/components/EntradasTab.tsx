import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Edit, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Entrada {
  id: number;
  codigo: string;
  produto: string;
  quantidadeEntrada: number;
  unidadeMedida: string;
  dataCompra: string;
  valorUnitario: string;
  valorTotal: string;
  fornecedor: string;
  notaFiscal: string;
  mes: string;
  ano: string;
}

export const EntradasTab = () => {
  const { toast } = useToast();
  const [entradas, setEntradas] = useState<Entrada[]>([
    {
      id: 1,
      codigo: "001",
      produto: "Pastilha de Freios",
      quantidadeEntrada: 50,
      unidadeMedida: "Uni",
      dataCompra: "01/01/25",
      valorUnitario: "15,00",
      valorTotal: "750,00",
      fornecedor: "Fornecedor A",
      notaFiscal: "12345",
      mes: "Janeiro",
      ano: "2025"
    },
    {
      id: 2,
      codigo: "002",
      produto: "Óleo de freios",
      quantidadeEntrada: 30,
      unidadeMedida: "Uni",
      dataCompra: "01/01/25",
      valorUnitario: "10,00",
      valorTotal: "300,00",
      fornecedor: "Fornecedor B",
      notaFiscal: "12346",
      mes: "Janeiro",
      ano: "2025"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Entrada | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMes, setFilterMes] = useState("");
  const [filterAno, setFilterAno] = useState("");

  const [formData, setFormData] = useState({
    codigo: "",
    produto: "",
    quantidadeEntrada: "",
    unidadeMedida: "Uni",
    dataCompra: "",
    valorUnitario: "",
    fornecedor: "",
    notaFiscal: "",
    mes: "",
    ano: ""
  });

  const resetForm = () => {
    setFormData({
      codigo: "",
      produto: "",
      quantidadeEntrada: "",
      unidadeMedida: "Uni",
      dataCompra: "",
      valorUnitario: "",
      fornecedor: "",
      notaFiscal: "",
      mes: "",
      ano: ""
    });
    setEditingItem(null);
  };

  const calculateTotal = (quantidade: string, valorUnitario: string) => {
    const qtd = parseFloat(quantidade) || 0;
    const valor = parseFloat(valorUnitario.replace(",", ".")) || 0;
    return (qtd * valor).toFixed(2).replace(".", ",");
  };

  const handleSubmit = () => {
    if (!formData.codigo || !formData.produto || !formData.quantidadeEntrada || !formData.valorUnitario) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const valorTotal = calculateTotal(formData.quantidadeEntrada, formData.valorUnitario);

    if (editingItem) {
      setEntradas(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { 
              ...item, 
              ...formData, 
              quantidadeEntrada: parseInt(formData.quantidadeEntrada),
              valorTotal 
            }
          : item
      ));
      toast({
        title: "Sucesso",
        description: "Entrada atualizada com sucesso!"
      });
    } else {
      const newId = Math.max(...entradas.map(e => e.id), 0) + 1;
      setEntradas(prev => [...prev, {
        id: newId,
        ...formData,
        quantidadeEntrada: parseInt(formData.quantidadeEntrada),
        valorTotal
      }]);
      toast({
        title: "Sucesso",
        description: "Entrada adicionada com sucesso!"
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: Entrada) => {
    setEditingItem(item);
    setFormData({
      codigo: item.codigo,
      produto: item.produto,
      quantidadeEntrada: item.quantidadeEntrada.toString(),
      unidadeMedida: item.unidadeMedida,
      dataCompra: item.dataCompra,
      valorUnitario: item.valorUnitario,
      fornecedor: item.fornecedor,
      notaFiscal: item.notaFiscal,
      mes: item.mes,
      ano: item.ano
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEntradas(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Sucesso",
      description: "Entrada removida com sucesso!"
    });
  };

  const filteredEntradas = entradas.filter(item => {
    const matchesSearch = item.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMes = !filterMes || item.mes === filterMes;
    const matchesAno = !filterAno || item.ano === filterAno;
    
    return matchesSearch && matchesMes && matchesAno;
  });

  const meses = Array.from(new Set(entradas.map(e => e.mes))).filter(Boolean);
  const anos = Array.from(new Set(entradas.map(e => e.ano))).filter(Boolean);

  return (
    <div className="p-6">
      <Card className="bg-secondary p-6 border-none">
        {/* Header com filtros e botão de adicionar */}
        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <div className="flex-1 min-w-64">
            <label className="block text-foreground font-medium mb-2">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por produto, código ou fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="min-w-32">
            <label className="block text-foreground font-medium mb-2">Mês</label>
            <Select value={filterMes} onValueChange={setFilterMes}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {meses.map(mes => (
                  <SelectItem key={mes} value={mes}>{mes}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-24">
            <label className="block text-foreground font-medium mb-2">Ano</label>
            <Select value={filterAno} onValueChange={setFilterAno}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {anos.map(ano => (
                  <SelectItem key={ano} value={ano}>{ano}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Nova Entrada
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Editar Entrada" : "Nova Entrada"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground font-medium mb-2">Código *</label>
                  <Input
                    value={formData.codigo}
                    onChange={(e) => setFormData(prev => ({ ...prev, codigo: e.target.value }))}
                    placeholder="Código do produto"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Produto *</label>
                  <Input
                    value={formData.produto}
                    onChange={(e) => setFormData(prev => ({ ...prev, produto: e.target.value }))}
                    placeholder="Nome do produto"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Quantidade *</label>
                  <Input
                    type="number"
                    value={formData.quantidadeEntrada}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantidadeEntrada: e.target.value }))}
                    placeholder="Quantidade"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Unidade de Medida</label>
                  <Select value={formData.unidadeMedida} onValueChange={(value) => setFormData(prev => ({ ...prev, unidadeMedida: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Uni">Unidade</SelectItem>
                      <SelectItem value="Kg">Quilograma</SelectItem>
                      <SelectItem value="L">Litro</SelectItem>
                      <SelectItem value="m">Metro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Data de Compra</label>
                  <Input
                    type="date"
                    value={formData.dataCompra}
                    onChange={(e) => setFormData(prev => ({ ...prev, dataCompra: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Valor Unitário (R$) *</label>
                  <Input
                    value={formData.valorUnitario}
                    onChange={(e) => setFormData(prev => ({ ...prev, valorUnitario: e.target.value }))}
                    placeholder="0,00"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Fornecedor</label>
                  <Input
                    value={formData.fornecedor}
                    onChange={(e) => setFormData(prev => ({ ...prev, fornecedor: e.target.value }))}
                    placeholder="Nome do fornecedor"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Nota Fiscal</label>
                  <Input
                    value={formData.notaFiscal}
                    onChange={(e) => setFormData(prev => ({ ...prev, notaFiscal: e.target.value }))}
                    placeholder="Número da nota fiscal"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Mês</label>
                  <Select value={formData.mes} onValueChange={(value) => setFormData(prev => ({ ...prev, mes: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Janeiro">Janeiro</SelectItem>
                      <SelectItem value="Fevereiro">Fevereiro</SelectItem>
                      <SelectItem value="Março">Março</SelectItem>
                      <SelectItem value="Abril">Abril</SelectItem>
                      <SelectItem value="Maio">Maio</SelectItem>
                      <SelectItem value="Junho">Junho</SelectItem>
                      <SelectItem value="Julho">Julho</SelectItem>
                      <SelectItem value="Agosto">Agosto</SelectItem>
                      <SelectItem value="Setembro">Setembro</SelectItem>
                      <SelectItem value="Outubro">Outubro</SelectItem>
                      <SelectItem value="Novembro">Novembro</SelectItem>
                      <SelectItem value="Dezembro">Dezembro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Ano</label>
                  <Input
                    type="number"
                    value={formData.ano}
                    onChange={(e) => setFormData(prev => ({ ...prev, ano: e.target.value }))}
                    placeholder="2025"
                    min="2000"
                    max="2030"
                  />
                </div>
              </div>

              {formData.quantidadeEntrada && formData.valorUnitario && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-foreground font-medium">
                    Valor Total: R$ {calculateTotal(formData.quantidadeEntrada, formData.valorUnitario)}
                  </p>
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {editingItem ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabela de entradas */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-foreground">Código</th>
                <th className="text-left py-3 font-medium text-foreground">Produto</th>
                <th className="text-center py-3 font-medium text-foreground">Qtd</th>
                <th className="text-center py-3 font-medium text-foreground">Unidade</th>
                <th className="text-left py-3 font-medium text-foreground">Data Compra</th>
                <th className="text-right py-3 font-medium text-foreground">Valor Unit.</th>
                <th className="text-right py-3 font-medium text-foreground">Valor Total</th>
                <th className="text-left py-3 font-medium text-foreground">Fornecedor</th>
                <th className="text-left py-3 font-medium text-foreground">Nota Fiscal</th>
                <th className="text-left py-3 font-medium text-foreground">Mês</th>
                <th className="text-left py-3 font-medium text-foreground">Ano</th>
                <th className="text-center py-3 font-medium text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntradas.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 text-foreground">{item.codigo}</td>
                  <td className="py-3 text-foreground">{item.produto}</td>
                  <td className="py-3 text-foreground text-center">{item.quantidadeEntrada}</td>
                  <td className="py-3 text-foreground text-center">{item.unidadeMedida}</td>
                  <td className="py-3 text-foreground">{item.dataCompra || "-"}</td>
                  <td className="py-3 text-foreground text-right">R$ {item.valorUnitario}</td>
                  <td className="py-3 text-foreground text-right">R$ {item.valorTotal}</td>
                  <td className="py-3 text-foreground">{item.fornecedor || "-"}</td>
                  <td className="py-3 text-foreground">{item.notaFiscal || "-"}</td>
                  <td className="py-3 text-foreground">{item.mes}</td>
                  <td className="py-3 text-foreground">{item.ano}</td>
                  <td className="py-3">
                    <div className="flex gap-2 justify-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredEntradas.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || filterMes || filterAno ? "Nenhuma entrada encontrada com os filtros aplicados." : "Nenhuma entrada cadastrada."}
            </div>
          )}
        </div>

        {/* Resumo */}
        {filteredEntradas.length > 0 && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex gap-8">
              <p className="text-foreground">
                <span className="font-medium">Total de Entradas:</span> {filteredEntradas.length}
              </p>
              <p className="text-foreground">
                <span className="font-medium">Valor Total:</span> R$ {
                  filteredEntradas
                    .reduce((sum, item) => sum + parseFloat(item.valorTotal.replace(",", ".")), 0)
                    .toFixed(2)
                    .replace(".", ",")
                }
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};