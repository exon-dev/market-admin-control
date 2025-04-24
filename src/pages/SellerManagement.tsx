import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/ui/status-badge";
import {
	Eye,
	Check,
	Ban,
	Trash2,
	MoreHorizontal,
	ArrowUpDown,
	Calendar,
	Store,
	X,
	Loader2,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Seller } from "@/types/sellers";
import {
	useSellerQuery,
	useVerifiedSellersQuery,
	useAllSellersQuery,
	useSellersWithStatusQuery,
} from "@/hooks/queries";

const SellerManagement = () => {
	// Status filter state
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const { toast } = useToast();

	// Query hooks for different seller statuses
	const { data: allSellers = [], isLoading: isLoadingAll } =
		useAllSellersQuery();
	const { data: pendingSellers = [], isLoading: isLoadingPending } =
		useSellerQuery();
	const { data: verifiedSellers = [], isLoading: isLoadingVerified } =
		useVerifiedSellersQuery();
	const { data: statusFilteredSellers = [], isLoading: isLoadingFiltered } =
		useSellersWithStatusQuery(
			statusFilter !== "all" &&
				statusFilter !== "pending" &&
				statusFilter !== "verified"
				? statusFilter
				: "rejected", // Fallback for the first render
		);

	// Loading state
	const isLoading =
		(statusFilter === "all" && isLoadingAll) ||
		(statusFilter === "pending" && isLoadingPending) ||
		(statusFilter === "verified" && isLoadingVerified) ||
		(statusFilter !== "all" &&
			statusFilter !== "pending" &&
			statusFilter !== "verified" &&
			isLoadingFiltered);

	// Determine which sellers to show based on status filter
	const displaySellers = (): Seller[] => {
		switch (statusFilter) {
			case "all":
				return allSellers;
			case "pending":
				return pendingSellers;
			case "verified":
				return verifiedSellers;
			default:
				return statusFilteredSellers;
		}
	};

	// Modal state
	const [modalState, setModalState] = useState<{
		isOpen: boolean;
		type: "approve" | "suspend" | "delete" | "reject";
		sellerId: string | null;
	}>({
		isOpen: false,
		type: "approve",
		sellerId: null,
	});

	const handleAction = (
		type: "approve" | "suspend" | "delete" | "reject",
		sellerId: string,
	) => {
		setModalState({ isOpen: true, type, sellerId });
	};

	const confirmAction = () => {
		if (!modalState.sellerId) return;

		// Handle action based on type
		if (modalState.type === "delete") {
			// For delete, we would typically make an API call here
			toast({
				title: "Seller Deleted",
				description: "The seller has been successfully deleted.",
			});
		} else {
			const actionMessages = {
				approve: "Seller has been approved successfully.",
				suspend: "Seller has been suspended.",
				reject: "Seller has been rejected.",
			};

			toast({
				title: `Seller ${
					modalState.type.charAt(0).toUpperCase() + modalState.type.slice(1)
				}ed`,
				description:
					actionMessages[modalState.type as keyof typeof actionMessages],
				variant: modalState.type === "approve" ? "default" : "destructive",
			});
		}

		setModalState({ isOpen: false, type: "approve", sellerId: null });

		// Refetch the data (this would typically be handled by React Query's invalidation)
		// In a real implementation, you'd invalidate the queries after a successful action
	};

	const columns: ColumnDef<Seller>[] = [
		{
			accessorKey: "business_name",
			header: ({ column }) => (
				<div
					className="flex cursor-pointer items-center"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Business Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</div>
			),
			cell: ({ row }) => (
				<Link
					to={`/sellers/${row.original.id}`}
					className="flex items-center hover:underline"
				>
					<Store className="mr-2 h-4 w-4 text-muted-foreground" />
					<span className="font-medium">{row.original.business_name}</span>
				</Link>
			),
		},
		{
			accessorKey: "full_name",
			header: "Full Name",
			cell: ({ row }) => (
				<div>
					{row.original.first_name} {row.original.middle_name}{" "}
					{row.original.last_name}
				</div>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				const status = row.original.status;
				const statusMap = {
					pending: { label: "Pending", variant: "pending" as const },
					verified: { label: "Verified", variant: "success" as const },
					suspended: { label: "Suspended", variant: "warning" as const },
					rejected: { label: "Rejected", variant: "error" as const },
				};

				const { label, variant } = statusMap[status];

				if (status === "pending") {
					return (
						<div className="flex items-center gap-2">
							<StatusBadge variant={variant} label={label} />
						</div>
					);
				}

				return <StatusBadge variant={variant} label={label} />;
			},
		},
		{
			accessorKey: "created_at",
			header: ({ column }) => (
				<div
					className="flex cursor-pointer items-center"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Created At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</div>
			),
			cell: ({ row }) => {
				const date = new Date(row.original.created_at);
				return (
					<div className="flex items-center">
						<Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
						{date.toLocaleDateString()}
					</div>
				);
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const seller = row.original;

				return (
					<div className="flex justify-end">
						<Link to={`/sellers/${seller.id}`}>
							<Button variant="ghost" size="icon" className="mr-1">
								<Eye className="h-4 w-4" />
							</Button>
						</Link>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{seller.status === "pending" && (
									<DropdownMenuItem
										onClick={() => handleAction("approve", seller.id)}
									>
										<Check className="mr-2 h-4 w-4" /> Approve
									</DropdownMenuItem>
								)}
								{seller.status !== "suspended" &&
									seller.status !== "rejected" && (
										<>
											<DropdownMenuItem
												onClick={() => handleAction("suspend", seller.id)}
											>
												<Ban className="mr-2 h-4 w-4" /> Suspend
											</DropdownMenuItem>
											{seller.status !== "rejected" && (
												<DropdownMenuItem
													onClick={() => handleAction("reject", seller.id)}
												>
													<X className="mr-2 h-4 w-4" /> Reject
												</DropdownMenuItem>
											)}
										</>
									)}
								<DropdownMenuItem
									onClick={() => handleAction("delete", seller.id)}
								>
									<Trash2 className="mr-2 h-4 w-4" /> Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Seller Management
					</h1>
					<p className="text-muted-foreground">
						Manage, review, and verify seller accounts
					</p>
				</div>

				<Card>
					<CardHeader>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
							<div>
								<CardTitle>Sellers</CardTitle>
								<CardDescription>
									{displaySellers().length} total sellers
								</CardDescription>
							</div>
							<div className="mt-2 sm:mt-0">
								<Select
									value={statusFilter}
									onValueChange={(value) => setStatusFilter(value)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Filter by status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Statuses</SelectItem>
										<SelectItem value="pending">Pending</SelectItem>
										<SelectItem value="verified">Approved</SelectItem>
										<SelectItem value="rejected">Rejected</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="flex h-[300px] w-full items-center justify-center">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : (
							<DataTable
								columns={columns}
								data={displaySellers()}
								searchKey="business_name"
								searchPlaceholder="Search business names..."
							/>
						)}
					</CardContent>
				</Card>
			</div>

			<ConfirmationModal
				isOpen={modalState.isOpen && modalState.type === "approve"}
				onClose={() => setModalState({ ...modalState, isOpen: false })}
				onConfirm={confirmAction}
				title="Approve Seller"
				description="Are you sure you want to approve this seller? They will be able to list products on the marketplace."
				confirmLabel="Approve"
				variant="default"
			/>

			<ConfirmationModal
				isOpen={modalState.isOpen && modalState.type === "suspend"}
				onClose={() => setModalState({ ...modalState, isOpen: false })}
				onConfirm={confirmAction}
				title="Suspend Seller"
				description="Are you sure you want to suspend this seller? Their products will be hidden from the marketplace."
				confirmLabel="Suspend"
				variant="destructive"
			/>

			<ConfirmationModal
				isOpen={modalState.isOpen && modalState.type === "delete"}
				onClose={() => setModalState({ ...modalState, isOpen: false })}
				onConfirm={confirmAction}
				title="Delete Seller"
				description="Are you sure you want to delete this seller? This action cannot be undone."
				confirmLabel="Delete"
				variant="destructive"
			/>

			<ConfirmationModal
				isOpen={modalState.isOpen && modalState.type === "reject"}
				onClose={() => setModalState({ ...modalState, isOpen: false })}
				onConfirm={confirmAction}
				title="Reject Seller"
				description="Are you sure you want to reject this seller? They will need to resubmit their verification documents."
				confirmLabel="Reject"
				variant="destructive"
			/>
		</DashboardLayout>
	);
};

export default SellerManagement;
