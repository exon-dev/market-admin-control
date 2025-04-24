import React, { useState } from "react";
import { useAuth } from "@/contexts";
import { useToast } from "@/hooks/use-toast";

interface SignInFormProps {
	onSuccess?: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { signIn } = useAuth();
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			toast({
				title: "Error",
				description: "Please enter both email and password.",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);

		try {
			const { error } = await signIn({ email, password });

			if (error) {
				throw error;
			}

			toast({
				title: "Success",
				description: "Signed in successfully.",
			});

			if (onSuccess) {
				onSuccess();
			}
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message || "Failed to sign in. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="email" className="block text-sm font-medium">
					Email
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="mt-1 w-full rounded-md border border-gray-300 p-2"
					placeholder="Enter your email"
					disabled={isLoading}
				/>
			</div>

			<div>
				<label htmlFor="password" className="block text-sm font-medium">
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="mt-1 w-full rounded-md border border-gray-300 p-2"
					placeholder="Enter your password"
					disabled={isLoading}
				/>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
			>
				{isLoading ? "Signing in..." : "Sign In"}
			</button>
		</form>
	);
};
