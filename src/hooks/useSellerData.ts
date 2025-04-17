
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface SellerVerificationHistory {
  id: string;
  action: string;
  timestamp: string;
  by: string;
  notes: string;
}

export interface SellerProduct {
  id: string;
  name: string;
  status: string;
  price: number;
  stock: number;
}

export interface SellerSalesStats {
  total_sales: number;
  total_orders: number;
  average_rating: number;
  return_rate: number;
}

export interface SellerData {
  id: string;
  business_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  seller_type: string;
  status: string;
  document_type: string;
  document_url: string;
  registered_address: string;
  zip_code: string;
  email: string;
  phone: string;
  website: string;
  dti_certification_number: string;
  dti_certification_expiry: string;
  government_id_type: string;
  government_id_url: string;
  tin_number: string;
  vat_status: string;
  notes: string;
  verified_by: string;
  verification_date: string;
  created_at: string;
  updated_at: string;
  verificationHistory: SellerVerificationHistory[];
  products: SellerProduct[];
  salesStats: SellerSalesStats;
}

// Mock data, would be replaced with real API call in production
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

export function useSellerData(sellerId: string) {
  const [sellerData, setSellerData] = useState<SellerData>(mockSellerDetails);
  const [notes, setNotes] = useState(mockSellerDetails.notes);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // In a real application, this would fetch data from an API
  const fetchSellerData = async () => {
    try {
      setIsLoading(true);
      // Fetch data from API - mocked for now
      // const response = await fetchFromAPI(`/sellers/${sellerId}`);
      // setSellerData(response);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching seller data",
        description: "Could not load seller details. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const updateSellerNotes = (newNotes: string) => {
    setNotes(newNotes);
    // In a real app, this would call an API to update the notes in the database
  };

  return {
    sellerData,
    notes,
    isLoading,
    updateSellerNotes,
    fetchSellerData,
  };
}
