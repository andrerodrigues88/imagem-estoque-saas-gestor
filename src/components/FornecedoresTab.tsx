import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
}

export const FornecedoresTab = () => {
  const { toast } = useToast();
  
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([
    {
      id: "1",
      nome: "Fornecedor 1",
      cnpj: "52137054/0001-05",
      endereco: "Rua Edmundo Alberta Mercer",
      telefone: "(81)99999-2929",
      email: "joanadasilva@hotmail.com"
    },
    {
      id: "2",
      nome: "Fornecedor 2",
      cnpj: "12345678/0001-90",
      endereco: "Av. Brasil, 123",
      telefone: "(11)88888-8888",
      email: "contato@fornecedor2.com"
    },
    {
      id: "3",
      nome: "Fornecedor 3",
      cnpj: "98765432/0001-10",
      endereco: "Rua das Flores, 456",
      telefone: "(21)77777-7777",
      email: "vendas@fornecedor3.com"
    }
  ]);

  const [selectedFornecedor, setSelectedFornecedor] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);
  
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    endereco: "",
    telefone: "",
    email: ""
  });

  const resetForm = () => {
    setFormData({
      nome: "",
      cnpj: "",
      endereco: "",
      telefone: "",
      email: ""
    });
    setEditingFornecedor(null);
  };

  const handleSubmit = () => {
    if (!formData.nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (editingFornecedor) {
      setFornecedores(prev => prev.map(f => 
        f.id === editingFornecedor.id 
          ? { ...f, ...formData }
          : f
      ));
      toast({
        title: "Sucesso",
        description: "Fornecedor atualizado com sucesso!"
      });
    } else {
      const newFornecedor: Fornecedor = {
        id: Date.now().toString(),
        ...formData
      };
      setFornecedores(prev => [...prev, newFornecedor]);
      toast({
        title: "Sucesso",
        description: "Fornecedor cadastrado com sucesso!"
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (fornecedor: Fornecedor) => {
    setEditingFornecedor(fornecedor);
    setFormData({
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      endereco: fornecedor.endereco,
      telefone: fornecedor.telefone,
      email: fornecedor.email
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setFornecedores(prev => prev.filter(f => f.id !== id));
    toast({
      title: "Sucesso",
      description: "Fornecedor removido com sucesso!"
    });
  };

  const filteredFornecedores = fornecedores.filter(fornecedor => {
    const matchesSearch = !searchTerm || 
      fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.cnpj.includes(searchTerm) ||
      fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSelected = !selectedFornecedor || selectedFornecedor === "todos" || fornecedor.id === selectedFornecedor;
    
    return matchesSearch && matchesSelected;
  });

  return (
    <div className="p-6">
      <Card className="bg-secondary p-6 border-none">
        {/* Header com filtros e botão adicionar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 items-end">
            <div>
              <Label htmlFor="search">Buscar</Label>
              <Input
                id="search"
                placeholder="Buscar por nome, CNPJ ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-muted border-border"
              />
            </div>
            <div>
              <Label htmlFor="filter">Filtrar por</Label>
              <Select value={selectedFornecedor} onValueChange={setSelectedFornecedor}>
                <SelectTrigger className="w-48 bg-muted border-border">
                  <SelectValue placeholder="Todos fornecedores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos fornecedores</SelectItem>
                  {fornecedores.map((fornecedor) => (
                    <SelectItem key={fornecedor.id} value={fornecedor.id}>
                      {fornecedor.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Novo Fornecedor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingFornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    className="bg-muted border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                    className="bg-muted border-border"
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
                    className="bg-muted border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                    className="bg-muted border-border"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-muted border-border"
                    placeholder="exemplo@email.com"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit}>
                  {editingFornecedor ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-foreground font-medium">Nome</th>
                <th className="text-left py-3 text-foreground font-medium">CNPJ</th>
                <th className="text-left py-3 text-foreground font-medium">Endereço</th>
                <th className="text-left py-3 text-foreground font-medium">Telefone</th>
                <th className="text-left py-3 text-foreground font-medium">Email</th>
                <th className="text-left py-3 text-foreground font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredFornecedores.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "Nenhum fornecedor encontrado" : "Nenhum fornecedor cadastrado"}
                  </td>
                </tr>
              ) : (
                filteredFornecedores.map((fornecedor) => (
                  <tr key={fornecedor.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 text-foreground font-medium">{fornecedor.nome}</td>
                    <td className="py-3 text-foreground">{fornecedor.cnpj || "-"}</td>
                    <td className="py-3 text-foreground">{fornecedor.endereco || "-"}</td>
                    <td className="py-3 text-foreground">{fornecedor.telefone || "-"}</td>
                    <td className="py-3 text-foreground">{fornecedor.email || "-"}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(fornecedor)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(fornecedor.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Resumo */}
        <div className="mt-4 text-sm text-muted-foreground">
          Total de fornecedores: {filteredFornecedores.length}
        </div>
      </Card>
    </div>
  );
};