import { supabase } from "./supabase";
import {
	AuthResponse,
	SignInCredentials,
	SignUpCredentials,
	ProfileUpdateData,
} from "@/types/auth";

// Check for an existing session on initialization
const initializeAuth = async () => {
	try {
		const { data } = await supabase.auth.getSession();
		return { session: data.session };
	} catch (error) {
		console.error("Error checking session:", error);
		return { session: null };
	}
};

// Initialize auth on load
initializeAuth();

export const signUp = async (
	credentials: SignUpCredentials,
): Promise<AuthResponse> => {
	try {
		const {
			email,
			password,
			full_name,
			role = "admin",
			store_name,
		} = credentials;

		console.log("Sign up credentials:", credentials);

		const { data: authData, error: authError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					full_name,
				},
			},
		});

		if (authError) {
			console.error("Sign up auth error:", authError);
			throw authError;
		}

		// Log auth data for debugging
		console.log("Auth data after signup:", authData);

		return {
			user: authData?.user
				? { id: authData.user.id, email: authData.user.email }
				: null,
			session: authData?.session || null,
			error: null,
		};
	} catch (error) {
		console.error("Signup error:", error);
		return {
			user: null,
			session: null,
			error: error as Error,
		};
	}
};

export const signIn = async (
	credentials: SignInCredentials,
): Promise<AuthResponse> => {
	try {
		const { email, password } = credentials;
		console.log("Signing in with credentials:", credentials);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) throw error;

		return {
			user: data?.user ? { id: data.user.id, email: data.user.email } : null,
			session: data?.session || null,
			error: null,
		};
	} catch (error) {
		console.error("Signin error:", error);
		return {
			user: null,
			session: null,
			error: error as Error,
		};
	}
};

export const signOut = async (): Promise<{ error: Error | null }> => {
	try {
		// Call Supabase signOut with proper options to ensure full logout
		const { error } = await supabase.auth.signOut({
			scope: "global", // This ensures complete signout from all devices
		});

		if (error) throw error;

		// Clear any local storage data after logout if needed
		localStorage.removeItem("supabase.auth.token");

		return { error: null };
	} catch (error) {
		console.error("Signout error:", error);
		return { error: error as Error };
	}
};

export const getCurrentUser = async () => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		return { user, error: null };
	} catch (error) {
		console.error("Get user error:", error);
		return { user: null, error: error as Error };
	}
};

export const getSession = async () => {
	try {
		const { data, error } = await supabase.auth.getSession();
		if (error) throw error;
		return { session: data.session, error: null };
	} catch (error) {
		console.error("Get session error:", error);
		return { session: null, error: error as Error };
	}
};

export const updateProfile = async (
	userId: string,
	data: ProfileUpdateData,
) => {
	try {
		const { error } = await supabase
			.from("profiles")
			.update({
				...data,
				updated_at: new Date().toISOString(),
			})
			.eq("id", userId);

		if (error) throw error;

		return { error: null };
	} catch (error) {
		console.error("Update profile error:", error);
		return { error: error as Error };
	}
};
