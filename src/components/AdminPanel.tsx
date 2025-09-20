import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Users, UserPlus, Edit, Trash2, Calendar, Shield } from 'lucide-react';

interface Profile {
  id: string;
  name: string | null;
  role: 'super_admin' | 'admin' | 'user';
  subscription_plan: 'monthly' | 'semiannual' | 'annual';
  subscription_status: 'active' | 'expired' | 'suspended';
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  created_at: string;
}

export const AdminPanel = () => {
  const { isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperAdmin) {
      fetchUsers();
    }
  }, [isSuperAdmin]);

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const subscriptionPlan = formData.get('subscription_plan') as string;
    const startDate = formData.get('start_date') as string;

    try {
      // Create user via Supabase Auth Admin API would require service role key
      // For now, we'll create a basic profile entry
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            subscription_plan: subscriptionPlan,
            subscription_start_date: startDate,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Usuário criado",
        description: "Usuário criado com sucesso!",
      });

      setIsDialogOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar usuário.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateUser = async (userId: string, updates: Partial<Profile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Usuário atualizado",
        description: "Dados do usuário atualizados com sucesso!",
      });

      fetchUsers();
      setEditingUser(null);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar usuário.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, text: 'Ativo' },
      expired: { variant: 'destructive' as const, text: 'Expirado' },
      suspended: { variant: 'secondary' as const, text: 'Suspenso' },
    };
    
    const config = variants[status as keyof typeof variants] || variants.active;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      super_admin: { variant: 'destructive' as const, text: 'Super Admin' },
      admin: { variant: 'default' as const, text: 'Admin' },
      user: { variant: 'secondary' as const, text: 'Usuário' },
    };
    
    const config = variants[role as keyof typeof variants] || variants.user;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Acesso Negado</h3>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar o painel administrativo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Painel Administrativo
              </CardTitle>
              <CardDescription>
                Gerencie usuários e assinaturas do sistema
              </CardDescription>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Usuário</DialogTitle>
                  <DialogDescription>
                    Adicione um novo usuário ao sistema com acesso controlado.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" name="password" type="password" minLength={6} required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Função</Label>
                      <Select name="role" defaultValue="user">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Usuário</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="super_admin">Super Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subscription_plan">Plano</Label>
                      <Select name="subscription_plan" defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Mensal</SelectItem>
                          <SelectItem value="semiannual">Semestral</SelectItem>
                          <SelectItem value="annual">Anual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Data de Início</Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Criar Usuário</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expira em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name || 'Sem nome'}
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell className="capitalize">
                      {user.subscription_plan === 'monthly' && 'Mensal'}
                      {user.subscription_plan === 'semiannual' && 'Semestral'}
                      {user.subscription_plan === 'annual' && 'Anual'}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.subscription_status)}
                    </TableCell>
                    <TableCell>
                      {user.subscription_end_date
                        ? new Date(user.subscription_end_date).toLocaleDateString('pt-BR')
                        : 'Indefinido'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Usuário</DialogTitle>
              <DialogDescription>
                Atualize as informações do usuário {editingUser.name}.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updates = {
                role: formData.get('role') as any,
                subscription_plan: formData.get('subscription_plan') as any,
                subscription_status: formData.get('subscription_status') as any,
                subscription_start_date: formData.get('start_date') as string,
              };
              handleUpdateUser(editingUser.id, updates);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Função</Label>
                  <Select name="role" defaultValue={editingUser.role}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select name="subscription_status" defaultValue={editingUser.subscription_status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="expired">Expirado</SelectItem>
                      <SelectItem value="suspended">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-plan">Plano</Label>
                  <Select name="subscription_plan" defaultValue={editingUser.subscription_plan}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="semiannual">Semestral</SelectItem>
                      <SelectItem value="annual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-start-date">Data de Início</Label>
                  <Input
                    id="edit-start-date"
                    name="start_date"
                    type="date"
                    defaultValue={editingUser.subscription_start_date || ''}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditingUser(null)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Alterações</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};