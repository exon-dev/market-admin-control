import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl =
	import.meta.env.VITE_SUPABASE_URL ||
	"https://hkmceojnnngqagjbzau.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase credentials. Please check your .env file.");
}

// Create the Supabase client with session persistence enabled
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		storageKey: "market-admin-auth",
	},
});
