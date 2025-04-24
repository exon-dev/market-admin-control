export interface SignUpCredentials {
	email: string;
	password: string;
	full_name?: string;
	role?: string;
	store_name?: string;
}

export interface SignInCredentials {
	email: string;
	password: string;
}

export interface AuthResponse {
	user: {
		id: string;
		email?: string;
	} | null;
	session: any | null;
	error: Error | null;
}

export interface ProfileUpdateData {
	username?: string;
	full_name?: string;
	avatar_url?: string;
	phone?: string;
	bio?: string;
	store_name?: string;
}
