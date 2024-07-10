export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      changelog: {
        Row: {
          created_at: string;
          id: number;
          lang: string[];
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          lang?: string[];
          title: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          lang?: string[];
          title?: string;
        };
        Relationships: [];
      };
      sub_threads: {
        Row: {
          attachments: string[];
          author: string[];
          created_at: string;
          lang: string[];
          likes: string[];
          sub_thread_id: number;
          text: string | null;
          thread_id: number;
          views: string[];
        };
        Insert: {
          attachments?: string[];
          author?: string[];
          created_at?: string;
          lang?: string[];
          likes?: string[];
          sub_thread_id?: number;
          text?: string | null;
          thread_id?: number;
          views?: string[];
        };
        Update: {
          attachments?: string[];
          author?: string[];
          created_at?: string;
          lang?: string[];
          likes?: string[];
          sub_thread_id?: number;
          text?: string | null;
          thread_id?: number;
          views?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "sub_threads_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "threads";
            referencedColumns: ["thread_id"];
          },
        ];
      };
      team_members: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          link: Json | null;
          name: string | null;
          place: string | null;
          position: string | null;
          uid: string;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          link?: Json | null;
          name?: string | null;
          place?: string | null;
          position?: string | null;
          uid?: string;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          link?: Json | null;
          name?: string | null;
          place?: string | null;
          position?: string | null;
          uid?: string;
          username?: string;
        };
        Relationships: [];
      };
      threads: {
        Row: {
          created_at: string;
          lang: string[];
          name: string | null;
          pinned: boolean;
          thread_id: number;
          threads: number[];
        };
        Insert: {
          created_at?: string;
          lang?: string[];
          name?: string | null;
          pinned?: boolean;
          thread_id?: number;
          threads?: number[];
        };
        Update: {
          created_at?: string;
          lang?: string[];
          name?: string | null;
          pinned?: boolean;
          thread_id?: number;
          threads?: number[];
        };
        Relationships: [];
      };
      users: {
        Row: {
          email: string | null;
          id: string;
          image: string | null;
          name: string | null;
        };
        Insert: {
          email?: string | null;
          id: string;
          image?: string | null;
          name?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      works: {
        Row: {
          authors: string[];
          created_at: string;
          id: number;
          link: string | null;
          name: string | null;
          thumbnail: Json;
          type: string;
        };
        Insert: {
          authors?: string[];
          created_at?: string;
          id?: number;
          link?: string | null;
          name?: string | null;
          thumbnail?: Json;
          type?: string;
        };
        Update: {
          authors?: string[];
          created_at?: string;
          id?: number;
          link?: string | null;
          name?: string | null;
          thumbnail?: Json;
          type?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
