import React, { useState } from "react";
import { useAuth } from "@/contexts";
import { useToast } from "@/hooks/use-toast";

interface SignUpFormProps {
	onSuccess?: () => void;
	showStoreField?: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
	onSuccess,
	showStoreField = false,
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [storeName, setStoreName] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { signUp } = useAuth();
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			toast({
				title: "Error",
				description: "Please enter email and password.",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);

		try {
			const credentials = {
				email,
				password,
				full_name: fullName,
				role: showStoreField ? "vendor" : "user",
				store_name: showStoreField ? storeName : undefined,
			};

			const { error } = await signUp(credentials);

			if (error) {
				throw error;
			}

			toast({
				title: "Success",
				description:
					"Account created successfully. Please check your email to confirm your account.",
			});

			if (onSuccess) {
				onSuccess();
			}
		} catch (error: any) {
			toast({
				title: "Error",
				description:
					error.message || "Failed to create account. Please try again.",
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

			<div>
				<label htmlFor="fullName" className="block text-sm font-medium">
					Full Name
				</label>
				<input
					id="fullName"
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					className="mt-1 w-full rounded-md border border-gray-300 p-2"
					placeholder="Enter your full name"
					disabled={isLoading}
				/>
			</div>

			{showStoreField && (
				<div>
					<label htmlFor="storeName" className="block text-sm font-medium">
						Store Name
					</label>
					<input
						id="storeName"
						type="text"
						value={storeName}
						onChange={(e) => setStoreName(e.target.value)}
						className="mt-1 w-full rounded-md border border-gray-300 p-2"
						placeholder="Enter your store name"
						disabled={isLoading}
					/>
				</div>
			)}

			<button
				type="submit"
				disabled={isLoading}
				className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
			>
				{isLoading ? "Creating Account..." : "Sign Up"}
			</button>
		</form>
	);
};
