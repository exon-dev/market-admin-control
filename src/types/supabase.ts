export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string;
					username: string;
					full_name: string;
					avatar_url: string;
					email: string;
					phone: string;
					bio: string;
					created_at: string;
					updated_at: string;
					role: string;
					status: string;
					store_name: string;
				};
				Insert: {
					id: string;
					username?: string;
					full_name?: string;
					avatar_url?: string;
					email?: string;
					phone?: string;
					bio?: string;
					created_at?: string;
					updated_at?: string;
					role?: string;
					status?: string;
					store_name?: string;
				};
				Update: {
					id?: string;
					username?: string;
					full_name?: string;
					avatar_url?: string;
					email?: string;
					phone?: string;
					bio?: string;
					created_at?: string;
					updated_at?: string;
					role?: string;
					status?: string;
					store_name?: string;
				};
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
	};
}
