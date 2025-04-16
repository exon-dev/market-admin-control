import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { RejectionModal } from "@/components/modals/RejectionModal";
import { useToast } from "@/hooks/use-toast";
import {
  Store,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  Check,
  X
} from "lucide-react";

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                <span>Business Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Business Type</label>
                <p>{sellerData.seller_type}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">TIN Number</label>
                <p>{sellerData.tin_number}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">VAT Status</label>
                <p>{sellerData.vat_status}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">DTI Certificate</label>
                <p>
                  {sellerData.dti_certification_number} (Expires: {new Date(sellerData.dti_certification_expiry).toLocaleDateString()})
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{sellerData.first_name} {sellerData.last_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{sellerData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{sellerData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{sellerData.website}</span>
              </div>
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                <span>{sellerData.registered_address}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Verification Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Document Type</label>
                    <p>{sellerData.document_type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <StatusBadge
                      variant={sellerData.status === "pending" ? "pending" : "success"}
                      label={sellerData.status.charAt(0).toUpperCase() + sellerData.status.slice(1)}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="block mb-2 text-sm font-medium text-muted-foreground">
                    Admin Notes
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add verification notes..."
                    rows={4}
                  />
                </div>

                {sellerData.status === "pending" && (
                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={handleApprove}
                      className="gap-2"
                    >
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setRejectionModalOpen(true)}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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
