import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { DocumentViewerModal } from "@/components/modals/DocumentViewerModal";
import {
	FileText,
	Globe,
	Mail,
	MapPin,
	Phone,
	Store,
	User,
	CalendarClock,
	FileCheck,
	Clock,
	Check,
	Ban,
	Trash2,
	Eye,
	ExternalLink,
	Info,
	FileSpreadsheet,
	BarChart as BarChartIcon,
	AlertCircle,
	Loader2,
	X,
} from "lucide-react";
import { useSellerDetailsQuery } from "@/hooks/queries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { updateSellerVerification } from "@/lib/sellers";

const getValidUrl = (url?: string | null): string => {
	if (!url) return "";

	// Make sure the URL is properly formed
	try {
		// Test if this is a valid URL
		new URL(url);

		// For Supabase storage URLs, ensure proper parameters
		if (url.includes("supabase.co/storage")) {
			// Clean the URL to ensure no duplicate parameters
			const baseUrl = url.split("?")[0];

			// Add parameters for proper document viewing
			return `${baseUrl}?download=false`;
		}

		return url;
	} catch (e) {
		// If not a valid URL, return empty string
		console.error("Invalid URL:", url);
		return "";
	}
};

const SellerDetails = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { toast } = useToast();
	const {
		data: sellerDetails,
		isLoading,
		isError,
		error,
		refetch,
	} = useSellerDetailsQuery(id);
	const [remarks, setRemarks] = useState("");
	const [status, setStatus] = useState(sellerDetails?.status || "pending");
	const [isUpdating, setIsUpdating] = useState(false);

	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "approve" | "reject" | "delete";
	}>({
		isOpen: false,
		type: "approve",
	});

	// Add document viewer modal state
	const [documentModal, setDocumentModal] = useState<{
		isOpen: boolean;
		url: string;
		title: string;
		type: "image" | "pdf" | "other";
	}>({
		isOpen: false,
		url: "",
		title: "",
		type: "image",
	});

	// Create the mutation
	const updateStatusMutation = useMutation({
		mutationFn: ({
			sellerId,
			newStatus,
		}: {
			sellerId: string;
			newStatus: string;
		}) => updateSellerVerification(sellerId, newStatus),
		onSuccess: () => {
			refetch();
			navigate("/sellers");
		},
		onError: (error) => {
			console.error("Error updating seller status:", error);
		},
	});

	// Update status when seller details load
	useEffect(() => {
		if (sellerDetails) {
			setStatus(sellerDetails.status);
			setRemarks(sellerDetails.remarks || "");
		}
	}, [sellerDetails]);

	const handleAction = (type: "approve" | "reject" | "delete") => {
		setModal({ isOpen: true, type });
	};

	const confirmAction = async () => {
		if (!id) return;

		try {
			if (modal.type === "approve") {
				await updateStatusMutation.mutateAsync({
					sellerId: id,
					newStatus: "verified",
				});
				toast({
					title: "Seller Approved",
					description: "The seller has been successfully approved.",
					variant: "default",
				});
			} else if (modal.type === "reject") {
				await updateStatusMutation.mutateAsync({
					sellerId: id,
					newStatus: "rejected",
				});
				toast({
					title: "Seller Rejected",
					description: "The seller has been rejected.",
					variant: "destructive",
				});
			} else if (modal.type === "delete") {
				// Handle deletion logic
				toast({
					title: "Seller Deleted",
					description: "The seller has been deleted.",
					variant: "destructive",
				});
				navigate("/sellers");
			}
		} catch (err) {
			toast({
				title: "Error",
				description: "Failed to update seller status. Please try again.",
				variant: "destructive",
			});
			console.error("Error updating seller status:", err);
		} finally {
			setModal({ isOpen: false, type: "approve" });
		}
	};

	const openDocumentViewer = (
		url?: string | null,
		title = "Document",
		type: "image" | "pdf" | "other" = "image",
	) => {
		const validUrl = getValidUrl(url);

		if (!validUrl) {
			toast({
				title: "Document Unavailable",
				description: "This document is not available for viewing.",
				variant: "destructive",
			});
			return;
		}

		setDocumentModal({
			isOpen: true,
			url: validUrl,
			title,
			type,
		});
	};

	if (isLoading) {
		return (
			<DashboardLayout>
				<div className="flex h-[70vh] items-center justify-center">
					<div className="flex flex-col items-center gap-2">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
						<p>Loading seller details...</p>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	if (isError) {
		return (
			<DashboardLayout>
				<div className="flex h-[70vh] items-center justify-center">
					<Alert variant="destructive" className="max-w-md">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							{error instanceof Error
								? error.message
								: "Failed to load seller details"}
						</AlertDescription>
						<Button
							variant="outline"
							className="mt-4"
							onClick={() => navigate("/sellers")}
						>
							Back to Sellers
						</Button>
					</Alert>
				</div>
			</DashboardLayout>
		);
	}

	if (!sellerDetails) {
		return (
			<DashboardLayout>
				<div className="flex h-[70vh] items-center justify-center">
					<Alert variant="destructive" className="max-w-md">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Seller Not Found</AlertTitle>
						<AlertDescription>
							The seller you're looking for doesn't exist or may have been
							deleted.
						</AlertDescription>
						<Button
							variant="outline"
							className="mt-4"
							onClick={() => navigate("/sellers")}
						>
							Back to Sellers
						</Button>
					</Alert>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className="space-y-4">
				{/* Sticky header with actions */}
				<div className=" px-4 py-3  sm:-mx-6 sm:px-6 border-b">
					<div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
						<div>
							<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
								{sellerDetails.business_name}
							</h1>
							<div className="flex items-center gap-2">
								<p className="text-sm text-muted-foreground">
									Seller ID: {sellerDetails.id}
								</p>
								<StatusBadge
									variant={
										status === "verified"
											? "success"
											: status === "rejected"
											? "warning"
											: status === "rejected"
											? "error"
											: "pending"
									}
									label={status.charAt(0).toUpperCase() + status.slice(1)}
								/>
							</div>
						</div>
						<div className="flex flex-wrap gap-2">
							{status === "pending" && (
								<Button
									onClick={() => handleAction("approve")}
									size="sm"
									variant="default"
									className="gap-1"
								>
									<Check className="h-4 w-4" /> Approve
								</Button>
							)}
							{status !== "rejected" && (
								<Button
									onClick={() => handleAction("reject")}
									variant="outline"
									size="sm"
									className="gap-1"
								>
									<Ban className="h-4 w-4" /> Reject
								</Button>
							)}
						</div>
					</div>
				</div>

				{/* Main content */}
				<div className="grid gap-4 md:grid-cols-3">
					{/* Left column */}
					<div className="space-y-4 md:col-span-2">
						{/* Verification status card */}
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2">
									<FileCheck className="h-5 w-5" />
									<span>Verification Status</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Status
										</h3>
										<StatusBadge
											variant={
												status === "verified"
													? "success"
													: status === "rejected"
													? "warning"
													: status === "rejected"
													? "error"
													: "pending"
											}
											label={status.charAt(0).toUpperCase() + status.slice(1)}
										/>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Verified By
										</h3>
										<p>{sellerDetails.verified_by || "Pending"}</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Verification Date
										</h3>
										<p>
											{sellerDetails.verification_date
												? new Date(
														sellerDetails.verification_date,
												  ).toLocaleDateString()
												: "Pending"}
										</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Registered On
										</h3>
										<p>
											{new Date(sellerDetails.created_at).toLocaleDateString()}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Business information */}
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2">
									<Store className="h-5 w-5" />
									<span>Business Information</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4 sm:grid-cols-2">
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Business Name
										</h3>
										<p>{sellerDetails.business_name}</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Business Type
										</h3>
										<p>{sellerDetails.seller_type}</p>
									</div>
									<div className="sm:col-span-2">
										<h3 className="text-sm font-medium text-muted-foreground">
											Business Address
										</h3>
										<p>
											{sellerDetails.registered_address},{" "}
											{sellerDetails.zip_code}
										</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											TIN Number
										</h3>
										<p>{sellerDetails.tin_number}</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											VAT Status
										</h3>
										<p>{sellerDetails.vat_status}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Right column */}
					<div className="space-y-4">
						{/* Personal information */}
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2">
									<User className="h-5 w-5" />
									<span>Personal Information</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Full Name
										</h3>
										<p>
											{sellerDetails.first_name} {sellerDetails.middle_name}{" "}
											{sellerDetails.last_name} {sellerDetails.suffix}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Documents */}
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2">
									<FileText className="h-5 w-5" />
									<span>Documents</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Document Type
										</h3>
										<p className="mb-1">{sellerDetails.document_type}</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											DTI Certificate
										</h3>
										<p className="text-sm">
											Number: {sellerDetails.document_number}
										</p>
										<p className="text-sm mb-2">
											Expires:{" "}
											{new Date(
												sellerDetails.document_expiry_date,
											).toLocaleDateString()}
										</p>
										<Button
											variant="secondary"
											size="sm"
											className="w-full gap-1 mt-1 shadow-sm font-medium"
											onClick={() =>
												openDocumentViewer(
													sellerDetails?.document_url,
													"DTI Certificate - " + sellerDetails?.document_number,
													"pdf",
												)
											}
										>
											<Eye className="h-4 w-4" />
											<span>View DTI Certificate</span>
										</Button>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Valid ID Type
										</h3>
										<p className="mb-2">{sellerDetails.valid_id}</p>
										<div className="flex flex-col gap-2">
											<Button
												variant="secondary"
												size="sm"
												className="w-full gap-1 shadow-sm font-medium"
												onClick={() =>
													openDocumentViewer(
														sellerDetails?.valid_id_front,
														`ID - ${
															sellerDetails?.valid_id || "Government ID"
														}`,
														"image",
													)
												}
											>
												<Eye className="h-4 w-4" />
												<span>View ID</span>
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Confirmation Modals */}
			<ConfirmationModal
				isOpen={modal.isOpen && modal.type === "approve"}
				onClose={() => setModal({ ...modal, isOpen: false })}
				onConfirm={confirmAction}
				title="Approve Seller"
				description="Are you sure you want to approve this seller? They will be able to list products on the marketplace."
				confirmLabel="Approve"
				variant="default"
				isLoading={updateStatusMutation.isPending}
			/>

			<ConfirmationModal
				isOpen={modal.isOpen && modal.type === "reject"}
				onClose={() => setModal({ ...modal, isOpen: false })}
				onConfirm={confirmAction}
				title="Reject Seller"
				description="Are you sure you want to reject this seller? Their products will be hidden from the marketplace."
				confirmLabel="Reject"
				variant="destructive"
				isLoading={updateStatusMutation.isPending}
			/>

			<ConfirmationModal
				isOpen={modal.isOpen && modal.type === "delete"}
				onClose={() => setModal({ ...modal, isOpen: false })}
				onConfirm={confirmAction}
				title="Delete Seller"
				description="Are you sure you want to delete this seller? This action cannot be undone."
				confirmLabel="Delete"
				variant="destructive"
				isLoading={updateStatusMutation.isPending}
			/>

			{/* Add the document viewer modal at the end of the component */}
			<DocumentViewerModal
				isOpen={documentModal.isOpen}
				onClose={() => setDocumentModal({ ...documentModal, isOpen: false })}
				title={documentModal.title}
				documentUrl={documentModal.url}
				documentType={documentModal.type}
			/>
		</DashboardLayout>
	);
};

export default SellerDetails;
