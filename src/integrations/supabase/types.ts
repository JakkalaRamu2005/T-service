export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      education_applications: {
        Row: {
          application_data: Json
          id: string
          scheme_id: string
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          application_data: Json
          id?: string
          scheme_id: string
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          application_data?: Json
          id?: string
          scheme_id?: string
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_applications_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "education_scheme_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      education_scheme_definitions: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string
          description: string
          eligibility: string[] | null
          external_link: string | null
          form_fields: Json | null
          funding_amount: string | null
          highlight: string | null
          id: string
          is_application_enabled: boolean | null
          is_info_only: boolean | null
          name: string
          required_documents: string[] | null
          status_stages: string[] | null
          target_community: string | null
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          category: string
          created_at?: string
          description: string
          eligibility?: string[] | null
          external_link?: string | null
          form_fields?: Json | null
          funding_amount?: string | null
          highlight?: string | null
          id?: string
          is_application_enabled?: boolean | null
          is_info_only?: boolean | null
          name: string
          required_documents?: string[] | null
          status_stages?: string[] | null
          target_community?: string | null
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string
          description?: string
          eligibility?: string[] | null
          external_link?: string | null
          form_fields?: Json | null
          funding_amount?: string | null
          highlight?: string | null
          id?: string
          is_application_enabled?: boolean | null
          is_info_only?: boolean | null
          name?: string
          required_documents?: string[] | null
          status_stages?: string[] | null
          target_community?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      education_status_tracking: {
        Row: {
          application_id: string
          current_status: string
          id: string
          remarks: string | null
          status_history: Json
          updated_at: string
        }
        Insert: {
          application_id: string
          current_status?: string
          id?: string
          remarks?: string | null
          status_history?: Json
          updated_at?: string
        }
        Update: {
          application_id?: string
          current_status?: string
          id?: string
          remarks?: string | null
          status_history?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_status_tracking_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "education_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      health_applications: {
        Row: {
          application_data: Json
          id: string
          scheme_id: string
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          application_data: Json
          id?: string
          scheme_id: string
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          application_data?: Json
          id?: string
          scheme_id?: string
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_health_applications_scheme_id"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "health_scheme_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_applications_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "health_scheme_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      health_scheme_definitions: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string
          description: string
          eligibility: string[] | null
          external_link: string | null
          form_fields: Json | null
          funding_amount: string | null
          highlight: string | null
          id: string
          is_application_enabled: boolean | null
          is_info_only: boolean | null
          name: string
          required_documents: string[] | null
          status_stages: string[] | null
          target_community: string | null
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          category: string
          created_at?: string
          description: string
          eligibility?: string[] | null
          external_link?: string | null
          form_fields?: Json | null
          funding_amount?: string | null
          highlight?: string | null
          id?: string
          is_application_enabled?: boolean | null
          is_info_only?: boolean | null
          name: string
          required_documents?: string[] | null
          status_stages?: string[] | null
          target_community?: string | null
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string
          description?: string
          eligibility?: string[] | null
          external_link?: string | null
          form_fields?: Json | null
          funding_amount?: string | null
          highlight?: string | null
          id?: string
          is_application_enabled?: boolean | null
          is_info_only?: boolean | null
          name?: string
          required_documents?: string[] | null
          status_stages?: string[] | null
          target_community?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      health_status_tracking: {
        Row: {
          application_id: string
          current_status: string
          id: string
          remarks: string | null
          status_history: Json
          updated_at: string
        }
        Insert: {
          application_id: string
          current_status?: string
          id?: string
          remarks?: string | null
          status_history?: Json
          updated_at?: string
        }
        Update: {
          application_id?: string
          current_status?: string
          id?: string
          remarks?: string | null
          status_history?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_health_status_tracking_application_id"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "health_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_status_tracking_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "health_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      housing_applications: {
        Row: {
          application_data: Json
          id: string
          scheme_id: string
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          application_data: Json
          id?: string
          scheme_id: string
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          application_data?: Json
          id?: string
          scheme_id?: string
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "housing_applications_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "housing_scheme_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      housing_scheme_definitions: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string
          description: string
          eligibility: string[] | null
          external_link: string | null
          form_fields: Json | null
          funding_amount: string | null
          highlight: string | null
          id: string
          is_application_enabled: boolean | null
          is_info_only: boolean | null
          name: string
          required_documents: string[] | null
          status_stages: string[] | null
          target_community: string | null
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          category: string
          created_at?: string
          description: string
          eligibility?: string[] | null
          external_link?: string | null
          form_fields?: Json | null
          funding_amount?: string | null
          highlight?: string | null
          id?: string
          is_application_enabled?: boolean | null
          is_info_only?: boolean | null
          name: string
          required_documents?: string[] | null
          status_stages?: string[] | null
          target_community?: string | null
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string
          description?: string
          eligibility?: string[] | null
          external_link?: string | null
          form_fields?: Json | null
          funding_amount?: string | null
          highlight?: string | null
          id?: string
          is_application_enabled?: boolean | null
          is_info_only?: boolean | null
          name?: string
          required_documents?: string[] | null
          status_stages?: string[] | null
          target_community?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      housing_status_tracking: {
        Row: {
          application_id: string
          current_status: string
          id: string
          remarks: string | null
          status_history: Json
          updated_at: string
        }
        Insert: {
          application_id: string
          current_status?: string
          id?: string
          remarks?: string | null
          status_history?: Json
          updated_at?: string
        }
        Update: {
          application_id?: string
          current_status?: string
          id?: string
          remarks?: string | null
          status_history?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "housing_status_tracking_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "housing_applications"
            referencedColumns: ["id"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
