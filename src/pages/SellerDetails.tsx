
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
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
  BarChart as BarChartIcon
} from "lucide-react";

// Mocked seller verification data for demo
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
  const sellerData = mockSellerDetails; // In a real app, fetch data based on id

  const [notes, setNotes] = useState(sellerData.notes);
  const [savedNotes, setSavedNotes] = useState(sellerData.notes);
  const [status, setStatus] = useState(sellerData.status);
  
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "approve" | "suspend" | "delete";
  }>({
    isOpen: false,
    type: "approve",
  });

  const handleNotesSave = () => {
    setSavedNotes(notes);
    // In a real app, save to backend
  };

  const handleAction = (type: "approve" | "suspend" | "delete") => {
    setModal({ isOpen: true, type });
  };

  const confirmAction = () => {
    if (modal.type === "approve") {
      setStatus("verified");
    } else if (modal.type === "suspend") {
      setStatus("suspended");
    } else if (modal.type === "delete") {
      // Handle deletion logic
      // In a real app, redirect to sellers list
    }
    
    setModal({ isOpen: false, type: "approve" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{sellerData.business_name}</h1>
            <p className="text-muted-foreground">
              Seller ID: {sellerData.id}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            <StatusBadge 
              variant={
                status === "verified" ? "success" : 
                status === "suspended" ? "warning" : 
                status === "rejected" ? "error" : "pending"
              } 
              label={status.charAt(0).toUpperCase() + status.slice(1)}
            />
            
            <div className="flex gap-2">
              {status === "pending" && (
                <Button onClick={() => handleAction("approve")} size="sm" className="gap-1">
                  <Check className="h-4 w-4" /> Approve
                </Button>
              )}
              
              {status !== "suspended" && (
                <Button onClick={() => handleAction("suspend")} variant="outline" size="sm" className="gap-1">
                  <Ban className="h-4 w-4" /> Suspend
                </Button>
              )}
              
              <Button onClick={() => handleAction("delete")} variant="destructive" size="sm" className="gap-1">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    <span>Business Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Business Name</h3>
                    <p>{sellerData.business_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Business Type</h3>
                    <p>{sellerData.seller_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">TIN Number</h3>
                    <p>{sellerData.tin_number}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">VAT Status</h3>
                    <p>{sellerData.vat_status}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">DTI Certificate</h3>
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
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                    <p>
                      {sellerData.first_name} {sellerData.middle_name} {sellerData.last_name} {sellerData.suffix}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p>{sellerData.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p>{sellerData.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <p>{sellerData.website}</p>
                  </div>
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    <p>{sellerData.registered_address}, {sellerData.zip_code}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    <span>Verification Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                      <StatusBadge 
                        variant={
                          status === "verified" ? "success" : 
                          status === "suspended" ? "warning" : 
                          status === "rejected" ? "error" : "pending"
                        } 
                        label={status.charAt(0).toUpperCase() + status.slice(1)}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Verified By</h3>
                      <p>{sellerData.verified_by || "Pending"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Verification Date</h3>
                      <p>
                        {sellerData.verification_date 
                          ? new Date(sellerData.verification_date).toLocaleString() 
                          : "Pending"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Registered On</h3>
                      <p>{new Date(sellerData.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">Admin Notes</h3>
                    <Textarea 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder="Add notes about this seller..." 
                    />
                    <div className="mt-2 flex justify-end">
                      <Button size="sm" onClick={handleNotesSave}>Save Notes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="verification" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>Business Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Document Type</h3>
                    <p>{sellerData.document_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">View Document</h3>
                    <Button variant="outline" size="sm" className="mt-1 gap-1">
                      <Eye className="h-4 w-4" /> 
                      <span>View Document</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">DTI Certificate</h3>
                    <p className="mb-1">Number: {sellerData.dti_certification_number}</p>
                    <p>Expiry: {new Date(sellerData.dti_certification_expiry).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">VAT Status</h3>
                    <p>{sellerData.vat_status}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>Government Identification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">ID Type</h3>
                    <p>{sellerData.government_id_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">View ID</h3>
                    <Button variant="outline" size="sm" className="mt-1 gap-1">
                      <Eye className="h-4 w-4" /> 
                      <span>View ID Document</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Verification Status</h3>
                    <StatusBadge 
                      variant={
                        status === "verified" ? "success" : 
                        status === "suspended" ? "warning" : 
                        status === "rejected" ? "error" : "pending"
                      } 
                      label={status.charAt(0).toUpperCase() + status.slice(1)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    <span>Verification Checklist</span>
                  </CardTitle>
                  <CardDescription>
                    Review these items before approving a seller
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Business name matches registration documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Government ID is valid and not expired</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>DTI certification is valid and not expired</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Business address is complete and valid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>TIN number format is valid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Contact information is provided and valid</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="gap-1" onClick={() => handleAction("approve")}>
                    <Check className="h-4 w-4" /> Complete Verification
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5" />
                  <span>Verification History</span>
                </CardTitle>
                <CardDescription>
                  Timeline of verification process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative ml-3 space-y-4 pt-2 pb-2">
                  <div className="absolute top-0 bottom-0 left-3 w-px bg-border"></div>
                  
                  {sellerData.verificationHistory.map((event, index) => (
                    <div key={event.id} className="relative flex gap-4">
                      <div className="absolute -left-3 mt-1.5 h-6 w-6 rounded-full border bg-background flex items-center justify-center">
                        <Clock className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1 rounded-lg border p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="font-medium">{event.action}</h3>
                          <time className="text-sm text-muted-foreground">
                            {new Date(event.timestamp).toLocaleString()}
                          </time>
                        </div>
                        <p className="mt-1 text-sm">By: {event.by}</p>
                        {event.notes && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {event.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  <span>Products ({sellerData.products.length})</span>
                </CardTitle>
                <CardDescription>
                  Products listed by this seller
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 text-left">
                        <th className="py-3 px-4 font-medium">Product Name</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium">Price</th>
                        <th className="py-3 px-4 font-medium">Stock</th>
                        <th className="py-3 px-4 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellerData.products.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="font-medium">{product.name}</div>
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge 
                              variant={product.status === "active" ? "success" : "pending"} 
                              label={product.status.charAt(0).toUpperCase() + product.status.slice(1)} 
                            />
                          </td>
                          <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                          <td className="py-3 px-4">{product.stock}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5" />
                  <span>Sales Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Total Sales</div>
                    <div className="mt-1 text-2xl font-bold">${sellerData.salesStats.total_sales.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Orders</div>
                    <div className="mt-1 text-2xl font-bold">{sellerData.salesStats.total_orders}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Avg. Rating</div>
                    <div className="mt-1 text-2xl font-bold">{sellerData.salesStats.average_rating}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Return Rate</div>
                    <div className="mt-1 text-2xl font-bold">{(sellerData.salesStats.return_rate * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
      />

      <ConfirmationModal
        isOpen={modal.isOpen && modal.type === "suspend"}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={confirmAction}
        title="Suspend Seller"
        description="Are you sure you want to suspend this seller? Their products will be hidden from the marketplace."
        confirmLabel="Suspend"
        variant="destructive"
      />

      <ConfirmationModal
        isOpen={modal.isOpen && modal.type === "delete"}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={confirmAction}
        title="Delete Seller"
        description="Are you sure you want to delete this seller? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
      />
    </DashboardLayout>
  );
};

export default SellerDetails;
