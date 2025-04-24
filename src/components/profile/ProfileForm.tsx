import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts";
import { useToast } from "@/hooks/use-toast";
import { ProfileUpdateData } from "@/types/auth";

export const ProfileForm: React.FC = () => {
	const { profile, user, updateProfile } = useAuth();
	const { toast } = useToast();

	const [formData, setFormData] = useState<ProfileUpdateData>({
		username: "",
		full_name: "",
		avatar_url: "",
		phone: "",
		bio: "",
		store_name: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (profile) {
			setFormData({
				username: profile.username || "",
				full_name: profile.full_name || "",
				avatar_url: profile.avatar_url || "",
				phone: profile.phone || "",
				bio: profile.bio || "",
				store_name: profile.store_name || "",
			});
		}
	}, [profile]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user?.id) {
			toast({
				title: "Error",
				description: "User not found. Please sign in again.",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);

		try {
			const { error } = await updateProfile(user.id, formData);

			if (error) {
				throw error;
			}

			toast({
				title: "Success",
				description: "Profile updated successfully.",
			});
		} catch (error: any) {
			toast({
				title: "Error",
				description:
					error.message || "Failed to update profile. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (!profile) {
		return <div>Loading profile...</div>;
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="username" className="block text-sm font-medium">
					Username
				</label>
				<input
					id="username"
					name="username"
					type="text"
					value={formData.username}
					onChange={handleChange}
					className="mt-1 w-full rounded-md border border-gray-300 p-2"
					disabled={isLoading}
				/>
			</div>

			<div>
				<label htmlFor="full_name" className="block text-sm font-medium">
					Full Name
				</label>
				<input
					id="full_name"
					name="full_name"
					type="text"
					value={formData.full_name}
					onChange={handleChange}
					className="mt-1 w-full rounded-md border border-gray-300 p-2"
					disabled={isLoading}
				/>
			</div>

			<div>
				<label htmlFor="avatar_url" className="block text-sm font-medium">
					Avatar URL
				</label>
				<input
					id="avatar_url"
					name="avatar_url"
					type="text"
					value={formData.avatar_url}
					onChange={handleChange}
					className="mt-1 w-full rounded-md border border-gray-300 p-2"
					disabled={isLoading}
				/>
			</div>

			<div>
				<label htmlFor="phone" className="block text-sm font-medium">
					Phone
				</label>
				<input
					id="phone"
					name="phone"
					type="text"
					value={formData.phone}
					onChange={handleChange}
					className="mt-1 w-full rounded-md border border-gray-300 p-2"
					disabled={isLoading}
				/>
			</div>

			<div>
				<label htmlFor="bio" className="block text-sm font-medium">
					Bio
				</label>
				<textarea
					id="bio"
					name="bio"
					value={formData.bio}
					onChange={handleChange}
					className="mt-1 w-full rounded-md border border-gray-300 p-2"
					disabled={isLoading}
					rows={3}
				/>
			</div>

			{profile.role === "vendor" && (
				<div>
					<label htmlFor="store_name" className="block text-sm font-medium">
						Store Name
					</label>
					<input
						id="store_name"
						name="store_name"
						type="text"
						value={formData.store_name}
						onChange={handleChange}
						className="mt-1 w-full rounded-md border border-gray-300 p-2"
						disabled={isLoading}
					/>
				</div>
			)}

			<button
				type="submit"
				disabled={isLoading}
				className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
			>
				{isLoading ? "Updating..." : "Update Profile"}
			</button>
		</form>
	);
};
