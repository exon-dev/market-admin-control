import React from "react";
import { useAuth } from "@/contexts";

export const ProfileCard: React.FC = () => {
	const { profile, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading profile...</div>;
	}

	if (!profile) {
		return <div>No profile found.</div>;
	}

	return (
		<div className="overflow-hidden rounded-lg bg-white shadow">
			<div className="bg-gray-100 px-4 py-5 sm:px-6">
				<div className="flex items-center">
					{profile.avatar_url ? (
						<img
							src={profile.avatar_url}
							alt={profile.full_name || "Profile"}
							className="h-12 w-12 rounded-full object-cover"
						/>
					) : (
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-gray-600">
							{profile.full_name
								? profile.full_name.charAt(0).toUpperCase()
								: "U"}
						</div>
					)}
					<div className="ml-4">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							{profile.full_name || "No name provided"}
						</h3>
						<p className="text-sm text-gray-500">
							@{profile.username || "username not set"}
						</p>
					</div>
				</div>
			</div>
			<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
				<dl className="sm:divide-y sm:divide-gray-200">
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">Full name</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{profile.full_name || "Not provided"}
						</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">Email</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{profile.email || "Not provided"}
						</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">Phone</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{profile.phone || "Not provided"}
						</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">Role</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{profile.role || "Not assigned"}
						</dd>
					</div>
					{profile.role === "vendor" && (
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
							<dt className="text-sm font-medium text-gray-500">Store</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{profile.store_name || "Not provided"}
							</dd>
						</div>
					)}
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">Bio</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{profile.bio || "No bio provided"}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};
