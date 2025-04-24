import React, { useState } from "react";
import { useAuth } from "@/contexts";
import { useToast } from "@/hooks/use-toast";

interface LogoutButtonProps {
	className?: string;
	onSuccess?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
	className = "",
	onSuccess,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const { signOut } = useAuth();
	const { toast } = useToast();

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			const { error } = await signOut();

			if (error) {
				throw error;
			}

			toast({
				title: "Success",
				description: "Signed out successfully.",
			});

			if (onSuccess) {
				onSuccess();
			}
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message || "Failed to sign out. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			onClick={handleLogout}
			disabled={isLoading}
			className={`rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50 ${className}`}
		>
			{isLoading ? "Signing out..." : "Sign Out"}
		</button>
	);
};
