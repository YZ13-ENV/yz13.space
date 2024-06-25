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
      page_rank: {
        Row: {
          created_at: string;
          disliked: boolean | null;
          id: number;
          liked: boolean | null;
          path: string | null;
          uid: string | null;
        };
        Insert: {
          created_at?: string;
          disliked?: boolean | null;
          id?: number;
          liked?: boolean | null;
          path?: string | null;
          uid?: string | null;
        };
        Update: {
          created_at?: string;
          disliked?: boolean | null;
          id?: number;
          liked?: boolean | null;
          path?: string | null;
          uid?: string | null;
        };
        Relationships: [];
      };
      real_time_messages: {
        Row: {
          created_at: string;
          id: number;
          text: string | null;
          uid: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          text?: string | null;
          uid?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          text?: string | null;
          uid?: string | null;
        };
        Relationships: [];
      };
      sub_threads: {
        Row: {
          attachments: Json | null;
          author: string[];
          created_at: string;
          lang: string[];
          likes: Json | null;
          sub_thread_id: number;
          text: string | null;
          thread_id: number;
          views: Json | null;
        };
        Insert: {
          attachments?: Json | null;
          author?: string[];
          created_at?: string;
          lang?: string[];
          likes?: Json | null;
          sub_thread_id?: number;
          text?: string | null;
          thread_id?: number;
          views?: Json | null;
        };
        Update: {
          attachments?: Json | null;
          author?: string[];
          created_at?: string;
          lang?: string[];
          likes?: Json | null;
          sub_thread_id?: number;
          text?: string | null;
          thread_id?: number;
          views?: Json | null;
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
          name: string | null;
          pinned: boolean;
          thread_id: number;
          threads: number[] | null;
        };
        Insert: {
          created_at?: string;
          name?: string | null;
          pinned?: boolean;
          thread_id?: number;
          threads?: number[] | null;
        };
        Update: {
          created_at?: string;
          name?: string | null;
          pinned?: boolean;
          thread_id?: number;
          threads?: number[] | null;
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
      visitors: {
        Row: {
          created_at: string;
          uid: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          uid?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          uid?: string;
          updated_at?: string | null;
          username?: string | null;
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
          thumbnail: string | null;
          type: string;
        };
        Insert: {
          authors?: string[];
          created_at?: string;
          id?: number;
          link?: string | null;
          name?: string | null;
          thumbnail?: string | null;
          type?: string;
        };
        Update: {
          authors?: string[];
          created_at?: string;
          id?: number;
          link?: string | null;
          name?: string | null;
          thumbnail?: string | null;
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
