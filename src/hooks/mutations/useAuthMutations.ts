import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut, signUp, updateProfile } from "@/lib/auth";
import {
	SignInCredentials,
	SignUpCredentials,
	ProfileUpdateData,
	AuthResponse,
} from "@/types/auth";

export const useSignUpMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<AuthResponse, Error, SignUpCredentials>({
		mutationFn: (credentials: SignUpCredentials) => {
			console.log("Sign up mutation started with:", credentials);
			return signUp(credentials);
		},
		onSuccess: (data) => {
			console.log("Sign up successful:", data);
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (error) => {
			console.error("Sign up failed:", error);
		},
	});
};

export const useSignInMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<AuthResponse, Error, SignInCredentials>({
		mutationFn: (credentials: SignInCredentials) => {
			console.log("Sign in mutation started with:", credentials.email);
			return signIn(credentials);
		},
		onSuccess: (data) => {
			console.log("Sign in successful:", data);
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (error) => {
			console.error("Sign in failed:", error);
		},
	});
};

export const useSignOutMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<{ error: Error | null }, Error, void>({
		mutationFn: () => {
			console.log("Sign out mutation started");
			return signOut();
		},
		onSuccess: () => {
			console.log("Sign out successful");
			queryClient.invalidateQueries({ queryKey: ["user"] });
			queryClient.setQueryData(["user"], null);
		},
		onError: (error) => {
			console.error("Sign out failed:", error);
		},
	});
};

export const useUpdateProfileMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<
		{ error: Error | null },
		Error,
		{ userId: string; data: ProfileUpdateData }
	>({
		mutationFn: ({
			userId,
			data,
		}: {
			userId: string;
			data: ProfileUpdateData;
		}) => {
			console.log("Update profile mutation started for user:", userId);
			return updateProfile(userId, data);
		},
		onSuccess: () => {
			console.log("Profile update successful");
			queryClient.invalidateQueries({ queryKey: ["user"] });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (error) => {
			console.error("Profile update failed:", error);
		},
	});
};
