export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      entradas: {
        Row: {
          ano: number | null
          criado_em: string
          criado_por: number | null
          data_compra: string
          fornecedor_id: number | null
          id: number
          mes: number | null
          nota_fiscal: string | null
          produto_id: number
          quantidade: number
          unidade_id: number | null
          valor_total: number | null
          valor_unit: number
        }
        Insert: {
          ano?: number | null
          criado_em?: string
          criado_por?: number | null
          data_compra: string
          fornecedor_id?: number | null
          id?: number
          mes?: number | null
          nota_fiscal?: string | null
          produto_id: number
          quantidade: number
          unidade_id?: number | null
          valor_total?: number | null
          valor_unit: number
        }
        Update: {
          ano?: number | null
          criado_em?: string
          criado_por?: number | null
          data_compra?: string
          fornecedor_id?: number | null
          id?: number
          mes?: number | null
          nota_fiscal?: string | null
          produto_id?: number
          quantidade?: number
          unidade_id?: number | null
          valor_total?: number | null
          valor_unit?: number
        }
        Relationships: [
          {
            foreignKeyName: "entradas_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entradas_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entradas_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entradas_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades_medida"
            referencedColumns: ["id"]
          },
        ]
      }
      estoque: {
        Row: {
          atualizado_em: string
          id: number
          produto_id: number
          quantidade: number
        }
        Insert: {
          atualizado_em?: string
          id?: number
          produto_id: number
          quantidade?: number
        }
        Update: {
          atualizado_em?: string
          id?: number
          produto_id?: number
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "estoque_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      fornecedores: {
        Row: {
          cnpj: string | null
          email: string | null
          endereco: string | null
          id: number
          nome: string
          telefone: string | null
        }
        Insert: {
          cnpj?: string | null
          email?: string | null
          endereco?: string | null
          id?: number
          nome: string
          telefone?: string | null
        }
        Update: {
          cnpj?: string | null
          email?: string | null
          endereco?: string | null
          id?: number
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      produtos: {
        Row: {
          classificacao: string | null
          codigo: string
          estoque_maximo: number | null
          estoque_minimo: number | null
          id: number
          nome: string
          unidade_id: number | null
        }
        Insert: {
          classificacao?: string | null
          codigo: string
          estoque_maximo?: number | null
          estoque_minimo?: number | null
          id?: number
          nome: string
          unidade_id?: number | null
        }
        Update: {
          classificacao?: string | null
          codigo?: string
          estoque_maximo?: number | null
          estoque_minimo?: number | null
          id?: number
          nome?: string
          unidade_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades_medida"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          business_id: string | null
          id: string
          name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      saidas: {
        Row: {
          ano: number | null
          criado_em: string
          criado_por: number | null
          data_saida: string
          id: number
          mes: number | null
          produto_id: number
          quantidade: number
          tipo_saida: string
          unidade_id: number | null
          valor_total_venda: number | null
          valor_unit_venda: number | null
        }
        Insert: {
          ano?: number | null
          criado_em?: string
          criado_por?: number | null
          data_saida: string
          id?: number
          mes?: number | null
          produto_id: number
          quantidade: number
          tipo_saida: string
          unidade_id?: number | null
          valor_total_venda?: number | null
          valor_unit_venda?: number | null
        }
        Update: {
          ano?: number | null
          criado_em?: string
          criado_por?: number | null
          data_saida?: string
          id?: number
          mes?: number | null
          produto_id?: number
          quantidade?: number
          tipo_saida?: string
          unidade_id?: number | null
          valor_total_venda?: number | null
          valor_unit_venda?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "saidas_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saidas_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saidas_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades_medida"
            referencedColumns: ["id"]
          },
        ]
      }
      unidades_medida: {
        Row: {
          id: number
          nome: string
          sigla: string
        }
        Insert: {
          id?: number
          nome: string
          sigla: string
        }
        Update: {
          id?: number
          nome?: string
          sigla?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          criado_em: string
          email: string | null
          id: number
          login: string
          nome: string | null
          papel: string
          senha_hash: string
        }
        Insert: {
          criado_em?: string
          email?: string | null
          id?: number
          login: string
          nome?: string | null
          papel?: string
          senha_hash: string
        }
        Update: {
          criado_em?: string
          email?: string | null
          id?: number
          login?: string
          nome?: string | null
          papel?: string
          senha_hash?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
