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
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_profiles_profile_id_fk"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "follows_following_id_profiles_profile_id_fk"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          recipient_id: string
          reference_id: string | null
          sender_id: string
          type: string
        }
        Insert: {
          content: string
          created_at?: string
          id: string
          is_read?: boolean
          recipient_id: string
          reference_id?: string | null
          sender_id: string
          type: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          recipient_id?: string
          reference_id?: string | null
          sender_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_id_profiles_profile_id_fk"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "notifications_sender_id_profiles_profile_id_fk"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      photos: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_thumbnail: boolean
          post_id: number | null
          profile_id: string | null
          trail_id: string | null
          updated_at: string
          url: string
          viewpoint_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: string
          is_thumbnail?: boolean
          post_id?: number | null
          profile_id?: string | null
          trail_id?: string | null
          updated_at?: string
          url: string
          viewpoint_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_thumbnail?: boolean
          post_id?: number | null
          profile_id?: string | null
          trail_id?: string | null
          updated_at?: string
          url?: string
          viewpoint_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "photos_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "photos_trail_id_trails_id_fk"
            columns: ["trail_id"]
            isOneToOne: false
            referencedRelation: "trails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_viewpoint_id_viewpoints_id_fk"
            columns: ["viewpoint_id"]
            isOneToOne: false
            referencedRelation: "viewpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      post_replies: {
        Row: {
          created_at: string
          parent_id: number | null
          post_id: number | null
          post_reply_id: number
          profile_id: string
          reply: string
          updated_at: string
          upvotes_count: number
        }
        Insert: {
          created_at?: string
          parent_id?: number | null
          post_id?: number | null
          post_reply_id?: never
          profile_id: string
          reply: string
          updated_at?: string
          upvotes_count?: number
        }
        Update: {
          created_at?: string
          parent_id?: number | null
          post_id?: number | null
          post_reply_id?: never
          profile_id?: string
          reply?: string
          updated_at?: string
          upvotes_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_replies_parent_id_post_replies_post_reply_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post_replies"
            referencedColumns: ["post_reply_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      post_reply_upvotes: {
        Row: {
          post_reply_id: number
          profile_id: string
        }
        Insert: {
          post_reply_id: number
          profile_id: string
        }
        Update: {
          post_reply_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reply_upvotes_post_reply_id_post_replies_post_reply_id_fk"
            columns: ["post_reply_id"]
            isOneToOne: false
            referencedRelation: "post_replies"
            referencedColumns: ["post_reply_id"]
          },
          {
            foreignKeyName: "post_reply_upvotes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      post_upvotes: {
        Row: {
          post_id: number
          profile_id: string
        }
        Insert: {
          post_id: number
          profile_id: string
        }
        Update: {
          post_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_upvotes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_upvotes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          post_id: number
          title: string
          updated_at: string
          viewpoint_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          post_id?: never
          title: string
          updated_at?: string
          viewpoint_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          post_id?: never
          title?: string
          updated_at?: string
          viewpoint_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_created_by_profiles_profile_id_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "posts_viewpoint_id_viewpoints_id_fk"
            columns: ["viewpoint_id"]
            isOneToOne: false
            referencedRelation: "viewpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          followers_count: number
          following_count: number
          name: string
          password: string
          posts_count: number
          profile_id: string
          trails_count: number
          updated_at: string
          username: string
          viewpoints_count: number
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          followers_count?: number
          following_count?: number
          name: string
          password: string
          posts_count?: number
          profile_id: string
          trails_count?: number
          updated_at?: string
          username: string
          viewpoints_count?: number
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          followers_count?: number
          following_count?: number
          name?: string
          password?: string
          posts_count?: number
          profile_id?: string
          trails_count?: number
          updated_at?: string
          username?: string
          viewpoints_count?: number
        }
        Relationships: []
      }
      trails: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          difficulty: string
          distance: number
          elevation_gain: number
          end_location: string
          estimated_time: number
          id: string
          posts_count: number
          rating: number
          rating_count: number
          season: string
          start_location: string
          title: string
          updated_at: string
          viewpoint_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          difficulty: string
          distance: number
          elevation_gain: number
          end_location: string
          estimated_time: number
          id: string
          posts_count?: number
          rating?: number
          rating_count?: number
          season: string
          start_location: string
          title: string
          updated_at?: string
          viewpoint_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          difficulty?: string
          distance?: number
          elevation_gain?: number
          end_location?: string
          estimated_time?: number
          id?: string
          posts_count?: number
          rating?: number
          rating_count?: number
          season?: string
          start_location?: string
          title?: string
          updated_at?: string
          viewpoint_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trails_created_by_profiles_profile_id_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "trails_viewpoint_id_viewpoints_id_fk"
            columns: ["viewpoint_id"]
            isOneToOne: false
            referencedRelation: "viewpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      viewpoints: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          id: string
          latitude: number
          location_name: string
          longitude: number
          rating: number
          rating_count: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          id: string
          latitude: number
          location_name: string
          longitude: number
          rating?: number
          rating_count?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          latitude?: number
          location_name?: string
          longitude?: number
          rating?: number
          rating_count?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "viewpoints_created_by_profiles_profile_id_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
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
