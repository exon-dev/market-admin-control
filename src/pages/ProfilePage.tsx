import React, { useState } from "react";
import { ProfileCard, ProfileForm } from "../components";
import { LogoutButton } from "../components/auth";
import { useAuth } from "../contexts";
import { useNavigate } from "react-router-dom";

export const ProfilePage: React.FC = () => {
	const [isEditing, setIsEditing] = useState(false);
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();

	// Redirect if not authenticated
	React.useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate("/signin");
		}
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl p-4">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Profile</h1>
				<div className="space-x-2">
					<button
						onClick={() => setIsEditing(!isEditing)}
						className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						{isEditing ? "View Profile" : "Edit Profile"}
					</button>
					<LogoutButton onSuccess={() => navigate("/signin")} />
				</div>
			</div>

			<div className="rounded-lg bg-white p-6 shadow-lg">
				{isEditing ? <ProfileForm /> : <ProfileCard />}
			</div>
		</div>
	);
};
