import React, { useState } from "react";
import { useAuth } from "@/contexts";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();

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

			// Force a page refresh to clear any in-memory state
			setTimeout(() => {
				if (onSuccess) {
					onSuccess();
				} else {
					navigate("/signin");
				}
				// Optional: force a full refresh to clear all application state
				// window.location.href = "/signin";
			}, 300);
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
			data-testid="logout-button"
		>
			{isLoading ? "Signing out..." : "Sign Out"}
		</button>
	);
};
