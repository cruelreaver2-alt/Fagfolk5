import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "./info";

// Singleton Supabase client instance
let supabaseInstance: SupabaseClient | null = null;

/**
 * Get the singleton Supabase client instance.
 * This ensures only one client is created across the entire application,
 * avoiding the "Multiple GoTrueClient instances" warning.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
  }
  return supabaseInstance;
}
