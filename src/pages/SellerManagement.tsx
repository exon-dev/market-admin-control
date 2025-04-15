
import React, { useState } from "react";
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
  Store
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mocked seller data
type Seller = {
  id: string;
  business_name: string;
  full_name: string;
  status: "pending" | "verified" | "suspended" | "rejected";
  document_type: string;
  created_at: string;
  verified_by?: string;
  verification_date?: string;
};

const mockSellers: Seller[] = [
  {
    id: "1",
    business_name: "Tech Solutions Inc",
    full_name: "John Doe",
    status: "verified",
    document_type: "Business Registration",
    created_at: "2023-04-12T10:30:00Z",
    verified_by: "Admin User",
    verification_date: "2023-04-15T14:25:00Z"
  },
  {
    id: "2",
    business_name: "Artisan Crafts",
    full_name: "Jane Smith",
    status: "pending",
    document_type: "DTI Certificate",
    created_at: "2023-04-14T09:15:00Z"
  },
  {
    id: "3",
    business_name: "Fashion Forward",
    full_name: "Alice Brown",
    status: "suspended",
    document_type: "Business Permit",
    created_at: "2023-03-25T11:45:00Z",
    verified_by: "Admin User",
    verification_date: "2023-03-28T16:30:00Z"
  },
  {
    id: "4",
    business_name: "Home Essentials",
    full_name: "Robert Johnson",
    status: "verified",
    document_type: "DTI Certificate",
    created_at: "2023-03-18T13:20:00Z",
    verified_by: "System Admin",
    verification_date: "2023-03-20T10:15:00Z"
  },
  {
    id: "5",
    business_name: "Gadget Heaven",
    full_name: "Emily Wilson",
    status: "pending",
    document_type: "Business Registration",
    created_at: "2023-04-16T15:10:00Z"
  },
  {
    id: "6",
    business_name: "Organic Delights",
    full_name: "Michael Chen",
    status: "verified",
    document_type: "Business Permit",
    created_at: "2023-03-10T08:45:00Z",
    verified_by: "Admin User",
    verification_date: "2023-03-12T11:30:00Z"
  },
  {
    id: "7",
    business_name: "Sports Unlimited",
    full_name: "David Lee",
    status: "rejected",
    document_type: "DTI Certificate",
    created_at: "2023-04-05T14:25:00Z"
  },
  {
    id: "8",
    business_name: "Bookworm Paradise",
    full_name: "Sophie Taylor",
    status: "verified",
    document_type: "Business Registration",
    created_at: "2023-03-22T10:55:00Z",
    verified_by: "System Admin",
    verification_date: "2023-03-24T09:40:00Z"
  }
];

const SellerManagement = () => {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "approve" | "suspend" | "delete";
    sellerId: string | null;
  }>({
    isOpen: false,
    type: "approve",
    sellerId: null,
  });

  const filteredSellers = statusFilter === "all" 
    ? sellers 
    : sellers.filter(seller => seller.status === statusFilter);

  const handleAction = (type: "approve" | "suspend" | "delete", sellerId: string) => {
    setModalState({ isOpen: true, type, sellerId });
  };

  const confirmAction = () => {
    if (!modalState.sellerId) return;

    const updatedSellers = sellers.map(seller => {
      if (seller.id === modalState.sellerId) {
        if (modalState.type === "approve") {
          return {
            ...seller,
            status: "verified" as const,
            verified_by: "Admin User",
            verification_date: new Date().toISOString()
          };
        } else if (modalState.type === "suspend") {
          return { ...seller, status: "suspended" as const };
        }
      }
      return seller;
    });

    if (modalState.type === "delete") {
      setSellers(sellers.filter(seller => seller.id !== modalState.sellerId));
    } else {
      setSellers(updatedSellers);
    }

    setModalState({ isOpen: false, type: "approve", sellerId: null });
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
        <div className="flex items-center">
          <Store className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.original.business_name}</span>
        </div>
      ),
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
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
                  <DropdownMenuItem onClick={() => handleAction("approve", seller.id)}>
                    <Check className="mr-2 h-4 w-4" /> Approve
                  </DropdownMenuItem>
                )}
                {seller.status !== "suspended" && (
                  <DropdownMenuItem onClick={() => handleAction("suspend", seller.id)}>
                    <Ban className="mr-2 h-4 w-4" /> Suspend
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => handleAction("delete", seller.id)}>
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
          <h1 className="text-3xl font-bold tracking-tight">Seller Management</h1>
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
                  {filteredSellers.length} total sellers
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
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={filteredSellers}
              searchKey="business_name"
              searchPlaceholder="Search business names..."
            />
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Modals */}
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
    </DashboardLayout>
  );
};

export default SellerManagement;
