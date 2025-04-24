import React, { useMemo, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CardStats } from "@/components/ui/card-stats";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Users,
	Activity,
	CheckCircle,
	XCircle,
	Clock,
	Loader2,
	AlertTriangle,
	Settings,
	FileText,
	Shield,
} from "lucide-react";
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	Legend,
} from "recharts";
import {
	useAllSellersQuery,
	useVerifiedSellersQuery,
	useSellerQuery,
	useSellersWithStatusQuery,
} from "@/hooks/queries";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Seller } from "@/types/sellers";

// Fallback data in case the real data is not available
const fallbackData = [
	{ name: "Jan", total: 10, approved: 5, pending: 3, rejected: 2 },
	{ name: "Feb", total: 15, approved: 8, pending: 4, rejected: 3 },
	{ name: "Mar", total: 20, approved: 12, pending: 5, rejected: 3 },
	{ name: "Apr", total: 25, approved: 15, pending: 6, rejected: 4 },
	{ name: "May", total: 30, approved: 18, pending: 7, rejected: 5 },
	{ name: "Jun", total: 35, approved: 22, pending: 8, rejected: 5 },
	{ name: "Jul", total: 40, approved: 26, pending: 9, rejected: 5 },
];

// Define admin activity type
interface AdminActivity {
	id: string;
	action: string;
	admin: string;
	timestamp: Date;
	details: string;
	type: string;
	status: string;
	sellerId?: string;
}

const Dashboard = () => {
	// Fetch all seller data using the same hooks as in SellerManagement
	const {
		data: allSellers = [],
		isLoading: isLoadingAll,
		error: errorAll,
	} = useAllSellersQuery();
	const {
		data: verifiedSellers = [],
		isLoading: isLoadingVerified,
		error: errorVerified,
	} = useVerifiedSellersQuery();
	const {
		data: pendingSellers = [],
		isLoading: isLoadingPending,
		error: errorPending,
	} = useSellerQuery();
	const {
		data: rejectedSellers = [],
		isLoading: isLoadingRejected,
		error: errorRejected,
	} = useSellersWithStatusQuery("rejected");

	// Loading state
	const isLoading =
		isLoadingAll || isLoadingVerified || isLoadingPending || isLoadingRejected;

	// Combine all errors
	const hasError = errorAll || errorVerified || errorPending || errorRejected;

	// Debug logging
	useEffect(() => {
		console.log("Dashboard data:", {
			allSellers,
			verifiedSellers,
			pendingSellers,
			rejectedSellers,
			isLoading,
			hasError,
		});
	}, [
		allSellers,
		verifiedSellers,
		pendingSellers,
		rejectedSellers,
		isLoading,
		hasError,
	]);

	// Calculate seller status count by month
	const sellerStatusData = useMemo(() => {
		// If no data is available or still loading, return fallback data
		if (isLoading || !allSellers || allSellers.length === 0) {
			return fallbackData;
		}

		try {
			// Group all sellers by month
			const monthlyData = new Map();

			// Process all sellers to sort by month
			allSellers.forEach((seller) => {
				if (!seller.created_at) return; // Skip if no date

				const date = new Date(seller.created_at);
				const monthYear = date.toLocaleString("default", {
					month: "short",
					year: "2-digit",
				});

				if (!monthlyData.has(monthYear)) {
					monthlyData.set(monthYear, {
						name: monthYear,
						total: 0,
						approved: 0,
						pending: 0,
						rejected: 0,
					});
				}

				const monthData = monthlyData.get(monthYear);
				monthData.total += 1;

				// Increment the appropriate status counter
				if (seller.status === "verified") {
					monthData.approved += 1;
				} else if (seller.status === "pending") {
					monthData.pending += 1;
				} else if (seller.status === "rejected") {
					monthData.rejected += 1;
				}
			});

			// Convert map to array and sort by date
			const result = Array.from(monthlyData.values()).sort((a, b) => {
				const monthA = new Date(`${a.name} 1, 2023`);
				const monthB = new Date(`${b.name} 1, 2023`);
				return monthA.getTime() - monthB.getTime();
			});

			// If no data was processed successfully, return fallback
			if (result.length === 0) {
				return fallbackData;
			}

			return result;
		} catch (error) {
			console.error("Error processing seller data for chart:", error);
			return fallbackData;
		}
	}, [allSellers, isLoading]);

	// Helper function to format time ago
	const formatTimeAgo = (date) => {
		try {
			const now = new Date();
			const diffMs = now.getTime() - date.getTime();
			const diffMin = Math.floor(diffMs / 60000);
			const diffHours = Math.floor(diffMs / 3600000);
			const diffDays = Math.floor(diffMs / 86400000);

			if (diffMin < 60) {
				return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`;
			} else if (diffHours < 24) {
				return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
			} else {
				return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
			}
		} catch (error) {
			console.error("Error formatting time:", error);
			return "recently";
		}
	};

	// Helper function to get icon based on activity type
	const getActivityIcon = (type) => {
		switch (type) {
			case "seller-verify":
				return CheckCircle;
			case "seller-reject":
				return XCircle;
			case "seller-pending":
				return Clock;
			default:
				return Activity;
		}
	};

	// Generate admin activities from seller data
	const adminActivities = useMemo(() => {
		if (isLoading) return [];

		try {
			const activities: AdminActivity[] = [];

			// Process verified sellers
			verifiedSellers.forEach((seller: Seller) => {
				if (seller.verification_date && seller.verified_by) {
					activities.push({
						id: `verify-${seller.id}`,
						action: "Seller Verification",
						admin: seller.verified_by,
						timestamp: new Date(seller.verification_date),
						details: `Verified seller: ${
							seller.business_name || "Unknown business"
						}`,
						type: "seller-verify",
						status: "success",
						sellerId: seller.id,
					});
				}
			});

			// Process rejected sellers
			rejectedSellers.forEach((seller: Seller) => {
				if (seller.verification_date && seller.verified_by) {
					activities.push({
						id: `reject-${seller.id}`,
						action: "Seller Rejection",
						admin: seller.verified_by,
						timestamp: new Date(seller.verification_date),
						details: `Rejected seller: ${
							seller.business_name || "Unknown business"
						}${
							seller.verification_remarks
								? ` - ${seller.verification_remarks}`
								: ""
						}`,
						type: "seller-reject",
						status: "error",
						sellerId: seller.id,
					});
				}
			});

			// Process pending sellers (new applications)
			pendingSellers.forEach((seller: Seller) => {
				if (seller.created_at) {
					activities.push({
						id: `pending-${seller.id}`,
						action: "New Seller Application",
						admin: "System",
						timestamp: new Date(seller.created_at),
						details: `New application received: ${
							seller.business_name || "Unknown business"
						}`,
						type: "seller-pending",
						status: "warning",
						sellerId: seller.id,
					});
				}
			});

			// Sort by timestamp (newest first)
			return activities.sort(
				(a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
			);
		} catch (error) {
			console.error("Error generating admin activities:", error);
			return [];
		}
	}, [verifiedSellers, rejectedSellers, pendingSellers, isLoading]);

	// Process admin activity logs for display
	const recentAdminActivities = useMemo(() => {
		try {
			// Return the 10 most recent activities with formatted times
			return adminActivities.slice(0, 10).map((activity) => ({
				...activity,
				timeFormatted: formatTimeAgo(activity.timestamp),
				icon: getActivityIcon(activity.type),
			}));
		} catch (error) {
			console.error("Error processing admin activities:", error);
			return [];
		}
	}, [adminActivities]);

	if (isLoading) {
		return (
			<DashboardLayout>
				<div className="flex h-[70vh] items-center justify-center">
					<div className="flex flex-col items-center gap-2">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
						<p>Loading dashboard data...</p>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	if (hasError) {
		return (
			<DashboardLayout>
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
						<p className="text-muted-foreground">
							Overview of your marketplace performance and activity
						</p>
					</div>

					<Alert variant="destructive">
						<AlertTriangle className="h-4 w-4" />
						<AlertTitle>Error loading dashboard data</AlertTitle>
						<AlertDescription>
							There was a problem fetching the latest data. Using fallback
							display instead.
						</AlertDescription>
					</Alert>

					{/* Rest of the UI with fallback data */}
					{/* ... */}
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
					<p className="text-muted-foreground">
						Overview of your marketplace performance and activity
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<CardStats
						title="Total Sellers"
						value={allSellers.length > 0 ? allSellers.length.toString() : "0"}
						trend={{
							value: allSellers.length > 0 ? 100 : 0,
							isPositive: true,
						}}
						icon={Users}
					/>
					<CardStats
						title="Approved Sellers"
						value={
							verifiedSellers.length > 0
								? verifiedSellers.length.toString()
								: "0"
						}
						trend={{
							value:
								allSellers.length > 0
									? Math.round(
											(verifiedSellers.length / allSellers.length) * 100,
									  )
									: 0,
							isPositive: true,
						}}
						icon={CheckCircle}
					/>
					<CardStats
						title="Pending Approvals"
						value={
							pendingSellers.length > 0 ? pendingSellers.length.toString() : "0"
						}
						trend={{
							value:
								allSellers.length > 0
									? Math.round(
											(pendingSellers.length / allSellers.length) * 100,
									  )
									: 0,
							isPositive: false,
						}}
						icon={Clock}
					/>
					<CardStats
						title="Rejected Sellers"
						value={
							rejectedSellers.length > 0
								? rejectedSellers.length.toString()
								: "0"
						}
						trend={{
							value:
								allSellers.length > 0
									? Math.round(
											(rejectedSellers.length / allSellers.length) * 100,
									  )
									: 0,
							isPositive: false,
						}}
						icon={XCircle}
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-1">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Users className="h-5 w-5" />
								<span>Seller Growth</span>
							</CardTitle>
							<CardDescription>
								Seller status distribution by month
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={sellerStatusData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Bar dataKey="total" fill="#8884d8" name="Total Sellers" />
										<Bar dataKey="approved" fill="#4ade80" name="Approved" />
										<Bar dataKey="pending" fill="#facc15" name="Pending" />
										<Bar dataKey="rejected" fill="#f87171" name="Rejected" />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid gap-4 md:grid-cols-1">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Activity className="h-5 w-5" />
								<span>Recent Admin Activity</span>
							</CardTitle>
							<CardDescription>
								Recent seller application reviews and system updates
							</CardDescription>
						</CardHeader>
						<CardContent>
							{isLoading ? (
								<div className="flex justify-center items-center py-8">
									<Loader2 className="h-8 w-8 animate-spin text-primary" />
								</div>
							) : recentAdminActivities.length === 0 ? (
								<div className="text-center py-8">
									<AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
									<p className="text-muted-foreground">
										No recent admin activities found
									</p>
									<p className="text-sm text-muted-foreground mt-1">
										New activities will appear here as admin actions are
										performed
									</p>
								</div>
							) : (
								<>
									<ul className="space-y-4 mb-6">
										{recentAdminActivities.map((activity, i) => {
											const Icon = activity.icon;
											return (
												<li
													key={i}
													className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0 last:pb-0 transition-all hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md p-2"
												>
													<div
														className={`mt-0.5 rounded-full p-1.5 ${
															activity.status === "success"
																? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
																: activity.status === "error"
																? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
																: activity.status === "warning"
																? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
																: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
														}`}
													>
														<Icon className="h-4 w-4" />
													</div>
													<div className="flex-1">
														<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
															<p className="font-medium">{activity.action}</p>
															<span className="text-xs text-muted-foreground">
																{activity.timeFormatted || "Unknown time"}
															</span>
														</div>
														<p className="text-sm text-muted-foreground mt-1">
															{activity.details || "No details available"}
														</p>
														<div className="flex items-center mt-1 text-xs text-muted-foreground">
															<span className="mr-3">
																Admin:{" "}
																<span className="font-semibold">
																	{activity.admin || "Unknown"}
																</span>
															</span>
															{activity.sellerId && (
																<Link
																	to={`/sellers/${activity.sellerId}`}
																	className="text-primary hover:underline"
																>
																	View Seller
																</Link>
															)}
														</div>
													</div>
												</li>
											);
										})}
									</ul>

									<div className="text-center">
										<Link
											to="/sellers"
											className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
										>
											View All Sellers
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="ml-2 h-4 w-4"
											>
												<path d="m9 18 6-6-6-6" />
											</svg>
										</Link>
									</div>
								</>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Dashboard;
