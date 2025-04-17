
import React from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PersonalInfoCard } from "@/components/seller/PersonalInfoCard";
import { BusinessInfoCard } from "@/components/seller/BusinessInfoCard";
import { VerificationInfoCard } from "@/components/seller/VerificationInfoCard";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { RejectionModal } from "@/components/modals/RejectionModal";
import { SellerDetailsHeader } from "@/components/seller/SellerDetailsHeader";
import { VerificationHistory } from "@/components/seller/VerificationHistory";
import { useSellerData } from "@/hooks/useSellerData";
import { useApprovalWorkflow } from "@/hooks/useApprovalWorkflow";

const SellerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    sellerData, 
    notes, 
    updateSellerNotes 
  } = useSellerData(id ?? "");
  
  const {
    rejectionModalOpen,
    setRejectionModalOpen,
    confirmModalOpen,
    setConfirmModalOpen,
    handleApprove,
    confirmApproval,
    handleReject
  } = useApprovalWorkflow();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SellerDetailsHeader 
          businessName={sellerData.business_name}
          sellerId={sellerData.id}
          status={sellerData.status}
        />

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
            onNotesChange={updateSellerNotes}
            onApprove={handleApprove}
            onReject={() => setRejectionModalOpen(true)}
          />
          
          <VerificationHistory history={sellerData.verificationHistory} />
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
