import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Loader2,
	X,
	Download,
	ExternalLink,
	FileText,
	File,
} from "lucide-react";

interface DocumentViewerModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	documentUrl: string;
	documentType?: "image" | "pdf" | "other";
	description?: string;
}

export function DocumentViewerModal({
	isOpen,
	onClose,
	title,
	documentUrl,
	documentType = "image",
	description,
}: DocumentViewerModalProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showFallback, setShowFallback] = useState(false);

	// Reset loading state when document URL changes or modal opens
	useEffect(() => {
		if (isOpen && documentUrl) {
			setIsLoading(true);
			setError(null);
			setShowFallback(false);
		}
	}, [documentUrl, isOpen]);

	const handleLoad = () => {
		setIsLoading(false);
	};

	const handleError = () => {
		setIsLoading(false);
		if (documentType === "pdf" && !showFallback) {
			setShowFallback(true);
		} else {
			setError("Failed to load document. Please try again later.");
		}
	};

	const openInNewTab = () => {
		window.open(documentUrl, "_blank");
	};

	const downloadDocument = () => {
		const link = document.createElement("a");
		link.href = documentUrl;
		link.download = title.replace(/\s+/g, "_").toLowerCase();
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const renderContent = () => {
		// If no document URL is provided
		if (!documentUrl) {
			return (
				<div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-md border border-dashed p-8 text-muted-foreground">
					<FileText className="h-16 w-16 text-muted-foreground/50" />
					<p>No document available</p>
				</div>
			);
		}

		if (error) {
			return (
				<div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-md border border-dashed p-8 text-muted-foreground">
					<p>{error}</p>
					<Button variant="outline" onClick={openInNewTab}>
						<ExternalLink className="mr-2 h-4 w-4" />
						Open in Browser
					</Button>
				</div>
			);
		}

		if (documentType === "pdf") {
			// If we've tried embedding and it failed, show the fallback
			if (showFallback) {
				return (
					<div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-4 rounded-md border border-dashed p-8 text-muted-foreground">
						<File className="h-16 w-16 text-primary/50" />
						<p>PDF preview is not available in the modal</p>
						<div className="flex gap-2">
							<Button variant="default" onClick={openInNewTab}>
								<ExternalLink className="mr-2 h-4 w-4" />
								Open PDF in New Tab
							</Button>
							<Button variant="outline" onClick={downloadDocument}>
								<Download className="mr-2 h-4 w-4" />
								Download PDF
							</Button>
						</div>
					</div>
				);
			}

			// For google docs viewer approach
			const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
				documentUrl,
			)}&embedded=true`;

			return (
				<>
					<iframe
						src={googleDocsUrl}
						className="h-[70vh] w-full rounded-md border"
						onLoad={handleLoad}
						onError={handleError}
						allow="fullscreen"
					/>
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-background/80">
							<Loader2 className="h-8 w-8 animate-spin text-primary" />
						</div>
					)}
				</>
			);
		}

		if (documentType === "image") {
			return (
				<>
					<div className="flex justify-center">
						<img
							src={documentUrl}
							alt={title}
							className="max-h-[70vh] rounded-md object-contain"
							onLoad={handleLoad}
							onError={handleError}
							crossOrigin="anonymous"
						/>
					</div>
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-background/80">
							<Loader2 className="h-8 w-8 animate-spin text-primary" />
						</div>
					)}
				</>
			);
		}

		return (
			<div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-md border border-dashed p-8 text-muted-foreground">
				<p>This document type cannot be previewed</p>
				<Button variant="outline" onClick={openInNewTab}>
					<ExternalLink className="mr-2 h-4 w-4" />
					Open in Browser
				</Button>
			</div>
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-3xl">
				<DialogHeader>
					<DialogTitle>{title || "Document Viewer"}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				<div className="relative mt-2">{renderContent()}</div>
				<DialogFooter className="flex flex-row items-center justify-between sm:justify-between">
					<Button variant="outline" onClick={openInNewTab}>
						<ExternalLink className="mr-2 h-4 w-4" />
						Open in New Tab
					</Button>
					<div className="flex gap-2">
						<Button variant="outline" onClick={downloadDocument}>
							<Download className="mr-2 h-4 w-4" />
							Download
						</Button>
						<Button variant="outline" onClick={onClose}>
							<X className="mr-2 h-4 w-4" />
							Close
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
