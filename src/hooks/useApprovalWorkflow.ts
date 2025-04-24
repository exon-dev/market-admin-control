
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useApprovalWorkflow() {
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { toast } = useToast();

  const handleApprove = () => {
    setConfirmModalOpen(true);
  };

  const confirmApproval = () => {
    toast({
      title: "Seller Approved",
      description: "The seller has been successfully approved.",
    });
    setConfirmModalOpen(false);
  };

  const handleReject = (reason: string) => {
    toast({
      title: "Seller Rejected",
      description: "The seller has been rejected with the provided reason.",
      variant: "destructive",
    });
    setRejectionModalOpen(false);
  };

  return {
    rejectionModalOpen,
    setRejectionModalOpen,
    confirmModalOpen,
    setConfirmModalOpen,
    handleApprove,
    confirmApproval,
    handleReject,
  };
}
