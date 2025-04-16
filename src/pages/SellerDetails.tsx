import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { PersonalInfoCard } from "@/components/seller/PersonalInfoCard";
import { BusinessInfoCard } from "@/components/seller/BusinessInfoCard";
import { VerificationInfoCard } from "@/components/seller/VerificationInfoCard";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { RejectionModal } from "@/components/modals/RejectionModal";
import { useToast } from "@/hooks/use-toast";

const mockSellerDetails = {
  id: "1",
  business_name: "Tech Solutions Inc",
  first_name: "John",
  middle_name: "",
  last_name: "Doe",
  suffix: "",
  seller_type: "Business",
  status: "verified",
  document_type: "Business Registration",
  document_url: "https://example.com/document.pdf",
  registered_address: "123 Tech Street, Silicon Valley, CA",
  zip_code: "90210",
  email: "john@techsolutions.com",
  phone: "+1 123-456-7890",
  website: "https://techsolutions.com",
  dti_certification_number: "DTI-12345-6789",
  dti_certification_expiry: "2025-06-30",
  government_id_type: "Driver's License",
  government_id_url: "https://example.com/id.pdf",
  tin_number: "123-456-789-000",
  vat_status: "VAT Registered",
  notes: "Seller provided complete documentation and passed all verification checks.",
  verified_by: "Admin User",
  verification_date: "2023-04-15T14:25:00Z",
  created_at: "2023-04-12T10:30:00Z",
  updated_at: "2023-04-15T14:25:00Z",
  verificationHistory: [
    {
      id: "hist1",
      action: "Document Submission",
      timestamp: "2023-04-12T10:30:00Z",
      by: "Seller",
      notes: "Initial submission of documents"
    },
    {
      id: "hist2",
      action: "Document Review",
      timestamp: "2023-04-13T09:15:00Z",
      by: "System",
      notes: "Automatic document validation"
    },
    {
      id: "hist3",
      action: "Manual Review",
      timestamp: "2023-04-14T11:45:00Z",
      by: "Admin User",
      notes: "Manual verification of business documents"
    },
    {
      id: "hist4",
      action: "Verification Approved",
      timestamp: "2023-04-15T14:25:00Z",
      by: "Admin User",
      notes: "Seller approved and verified"
    }
  ],
  products: [
    { id: "p1", name: "Wireless Earbuds", status: "active", price: 89.99, stock: 45 },
    { id: "p2", name: "Smart Watch", status: "active", price: 199.99, stock: 23 },
    { id: "p3", name: "Bluetooth Speaker", status: "pending", price: 79.99, stock: 12 },
    { id: "p4", name: "USB-C Hub", status: "active", price: 49.99, stock: 34 }
  ],
  salesStats: {
    total_sales: 24500,
    total_orders: 325,
    average_rating: 4.8,
    return_rate: 0.02
  }
};

const SellerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const sellerData = mockSellerDetails;
  const { toast } = useToast();

  const [notes, setNotes] = useState(sellerData.notes);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{sellerData.business_name}</h1>
            <p className="text-muted-foreground">Seller ID: {sellerData.id}</p>
          </div>
          <StatusBadge
            variant={sellerData.status === "pending" ? "pending" : "success"}
            label={sellerData.status.charAt(0).toUpperCase() + sellerData.status.slice(1)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PersonalInfoCard
            firstName={sellerData.first_name}
            middleName={sellerData.middle_name}
            lastName={sellerData.last_name}
            suffix={sellerData.suffix}
            email={sellerData.email}
            phone={sellerData.phone}
            website={sellerData.website}
          />

          <BusinessInfoCard
            businessName={sellerData.business_name}
            sellerType={sellerData.seller_type}
            tinNumber={sellerData.tin_number}
            vatStatus={sellerData.vat_status}
            registeredAddress={sellerData.registered_address}
            zipCode={sellerData.zip_code}
            dtiCertificationNumber={sellerData.dti_certification_number}
            dtiCertificationExpiry={sellerData.dti_certification_expiry}
          />

          <VerificationInfoCard
            documentType={sellerData.document_type}
            documentUrl={sellerData.document_url}
            governmentIdType={sellerData.government_id_type}
            governmentIdUrl={sellerData.government_id_url}
            status={sellerData.status}
            verifiedBy={sellerData.verified_by}
            verificationDate={sellerData.verification_date}
            notes={notes}
            onNotesChange={setNotes}
            onApprove={handleApprove}
            onReject={() => setRejectionModalOpen(true)}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmApproval}
        title="Approve Seller"
        description="Are you sure you want to approve this seller? They will be able to list products on the marketplace."
        confirmLabel="Approve"
      />

      <RejectionModal
        isOpen={rejectionModalOpen}
        onClose={() => setRejectionModalOpen(false)}
        onConfirm={handleReject}
      />
    </DashboardLayout>
  );
};

export default SellerDetails;
