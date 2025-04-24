import React, {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from "react";
import { useUserQuery } from "@/hooks/queries";
import {
	useSignInMutation,
	useSignOutMutation,
	useSignUpMutation,
	useUpdateProfileMutation,
} from "@/hooks/mutations";
import {
	SignInCredentials,
	SignUpCredentials,
	ProfileUpdateData,
	AuthResponse,
} from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { supabase } from "@/lib/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface AuthContextType {
	user: User | null;
	profile: Profile | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	signUp: (credentials: SignUpCredentials) => Promise<AuthResponse>;
	signIn: (credentials: SignInCredentials) => Promise<AuthResponse>;
	signOut: () => Promise<{ error: Error | null }>;
	updateProfile: (
		userId: string,
		data: ProfileUpdateData,
	) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { data, isLoading, refetch } = useUserQuery();
	const signUpMutation = useSignUpMutation();
	const signInMutation = useSignInMutation();
	const signOutMutation = useSignOutMutation();
	const updateProfileMutation = useUpdateProfileMutation();
	const [initialized, setInitialized] = useState(false);

	const user = data?.user || null;
	const profile = data?.profile || null;
	const isAuthenticated = !!user;

	// Listen for auth state changes
	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log("Auth state changed:", event, session);
			if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
				refetch();
			} else if (event === "SIGNED_OUT") {
				refetch();
			}
		});

		setInitialized(true);

		return () => {
			subscription.unsubscribe();
		};
	}, [refetch]);

	const handleSignUp = async (credentials: SignUpCredentials) => {
		return signUpMutation.mutateAsync(credentials);
	};

	const handleSignIn = async (credentials: SignInCredentials) => {
		return signInMutation.mutateAsync(credentials);
	};

	const handleSignOut = async () => {
		return signOutMutation.mutateAsync();
	};

	const handleUpdateProfile = async (
		userId: string,
		data: ProfileUpdateData,
	) => {
		return updateProfileMutation.mutateAsync({ userId, data });
	};

	const value = {
		user,
		profile,
		isLoading: isLoading || !initialized,
		isAuthenticated,
		signUp: handleSignUp,
		signIn: handleSignIn,
		signOut: handleSignOut,
		updateProfile: handleUpdateProfile,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
