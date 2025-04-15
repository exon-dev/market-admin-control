
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  Eye, 
  Check, 
  X, 
  MoreHorizontal, 
  ArrowUpDown, 
  ShoppingBasket,
  Flag,
  Tags
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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mocked product data
type Product = {
  id: string;
  name: string;
  seller: string;
  seller_id: string;
  category: string;
  status: "pending" | "approved" | "rejected" | "flagged";
  price: number;
  stock: number;
  created_at: string;
};

// Mocked category data
type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  products_count: number;
};

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Wireless Earbuds",
    seller: "Tech Solutions Inc",
    seller_id: "1",
    category: "Electronics",
    status: "approved",
    price: 89.99,
    stock: 45,
    created_at: "2023-04-10T12:30:00Z"
  },
  {
    id: "p2",
    name: "Smart Watch",
    seller: "Tech Solutions Inc",
    seller_id: "1",
    category: "Electronics",
    status: "approved",
    price: 199.99,
    stock: 23,
    created_at: "2023-04-11T10:15:00Z"
  },
  {
    id: "p3",
    name: "Bluetooth Speaker",
    seller: "Tech Solutions Inc",
    seller_id: "1",
    category: "Electronics",
    status: "pending",
    price: 79.99,
    stock: 12,
    created_at: "2023-04-12T14:45:00Z"
  },
  {
    id: "p4",
    name: "Leather Wallet",
    seller: "Fashion Forward",
    seller_id: "3",
    category: "Accessories",
    status: "approved",
    price: 49.99,
    stock: 34,
    created_at: "2023-04-05T09:20:00Z"
  },
  {
    id: "p5",
    name: "Fake Designer Bag",
    seller: "Fashion Forward",
    seller_id: "3",
    category: "Accessories",
    status: "flagged",
    price: 299.99,
    stock: 5,
    created_at: "2023-04-08T16:10:00Z"
  },
  {
    id: "p6",
    name: "Handmade Ceramic Mug",
    seller: "Artisan Crafts",
    seller_id: "2",
    category: "Home & Kitchen",
    status: "pending",
    price: 24.99,
    stock: 18,
    created_at: "2023-04-14T11:30:00Z"
  },
  {
    id: "p7",
    name: "Organic Scented Candle",
    seller: "Artisan Crafts",
    seller_id: "2",
    category: "Home & Kitchen",
    status: "rejected",
    price: 19.99,
    stock: 0,
    created_at: "2023-04-13T15:25:00Z"
  },
  {
    id: "p8",
    name: "Ergonomic Office Chair",
    seller: "Home Essentials",
    seller_id: "4",
    category: "Furniture",
    status: "approved",
    price: 249.99,
    stock: 8,
    created_at: "2023-04-07T13:40:00Z"
  }
];

const mockCategories: Category[] = [
  {
    id: "c1",
    name: "Electronics",
    slug: "electronics",
    parent_id: null,
    products_count: 135
  },
  {
    id: "c2",
    name: "Accessories",
    slug: "accessories",
    parent_id: null,
    products_count: 89
  },
  {
    id: "c3",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    parent_id: null,
    products_count: 112
  },
  {
    id: "c4",
    name: "Furniture",
    slug: "furniture",
    parent_id: null,
    products_count: 46
  },
  {
    id: "c5",
    name: "Audio",
    slug: "audio",
    parent_id: "c1",
    products_count: 48
  },
  {
    id: "c6",
    name: "Smart Devices",
    slug: "smart-devices",
    parent_id: "c1",
    products_count: 37
  }
];

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "approve" | "reject" | "flag";
    productId: string | null;
  }>({
    isOpen: false,
    type: "approve",
    productId: null,
  });
  
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    type: "add" | "edit";
    category: Category | null;
  }>({
    isOpen: false,
    type: "add",
    category: null,
  });
  
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState<string | null>(null);
  
  const [rejectReason, setRejectReason] = useState("");

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const statusMatch = statusFilter === "all" || product.status === statusFilter;
    const categoryMatch = categoryFilter === "all" || product.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const handleAction = (type: "approve" | "reject" | "flag", productId: string) => {
    setModalState({ isOpen: true, type, productId });
    if (type === "reject") {
      setRejectReason("");
    }
  };

  const confirmAction = () => {
    if (!modalState.productId) return;

    const updatedProducts = products.map(product => {
      if (product.id === modalState.productId) {
        if (modalState.type === "approve") {
          return { ...product, status: "approved" as const };
        } else if (modalState.type === "reject") {
          return { ...product, status: "rejected" as const };
        } else if (modalState.type === "flag") {
          return { ...product, status: "flagged" as const };
        }
      }
      return product;
    });

    setProducts(updatedProducts);
    setModalState({ isOpen: false, type: "approve", productId: null });
  };

  const handleCategoryAction = (type: "add" | "edit", category?: Category) => {
    if (type === "edit" && category) {
      setNewCategoryName(category.name);
      setNewCategorySlug(category.slug);
      setNewCategoryParent(category.parent_id);
      setCategoryModal({ isOpen: true, type, category });
    } else {
      setNewCategoryName("");
      setNewCategorySlug("");
      setNewCategoryParent(null);
      setCategoryModal({ isOpen: true, type, category: null });
    }
  };

  const saveCategoryChanges = () => {
    if (categoryModal.type === "add") {
      // Add new category
      const newCategory: Category = {
        id: `c${categories.length + 1}`, // In a real app, this would be generated by the backend
        name: newCategoryName,
        slug: newCategorySlug || newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        parent_id: newCategoryParent,
        products_count: 0
      };
      setCategories([...categories, newCategory]);
    } else if (categoryModal.type === "edit" && categoryModal.category) {
      // Update existing category
      const updatedCategories = categories.map(cat => {
        if (cat.id === categoryModal.category?.id) {
          return {
            ...cat,
            name: newCategoryName,
            slug: newCategorySlug,
            parent_id: newCategoryParent
          };
        }
        return cat;
      });
      setCategories(updatedCategories);
    }
    
    setCategoryModal({ isOpen: false, type: "add", category: null });
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <ShoppingBasket className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "seller",
      header: "Seller",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Tags className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{row.original.category}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div>${row.original.price.toFixed(2)}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        
        const statusMap = {
          pending: { label: "Pending", variant: "pending" as const },
          approved: { label: "Approved", variant: "success" as const },
          rejected: { label: "Rejected", variant: "error" as const },
          flagged: { label: "Flagged", variant: "warning" as const },
        };
        
        const { label, variant } = statusMap[status];
        
        return <StatusBadge variant={variant} label={label} />;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.original.stock;
        return (
          <div className={stock < 10 ? "text-yellow-600 font-medium" : ""}>
            {stock}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
        
        return (
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" className="mr-1">
              <Eye className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {product.status === "pending" && (
                  <>
                    <DropdownMenuItem onClick={() => handleAction("approve", product.id)}>
                      <Check className="mr-2 h-4 w-4" /> Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction("reject", product.id)}>
                      <X className="mr-2 h-4 w-4" /> Reject
                    </DropdownMenuItem>
                  </>
                )}
                {product.status !== "flagged" && (
                  <DropdownMenuItem onClick={() => handleAction("flag", product.id)}>
                    <Flag className="mr-2 h-4 w-4" /> Flag Product
                  </DropdownMenuItem>
                )}
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
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">
            Manage, approve, and categorize products
          </p>
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="flagged">Flagged Items ({products.filter(p => p.status === "flagged").length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      {filteredProducts.length} products found
                    </CardDescription>
                  </div>
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
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
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={categoryFilter}
                      onValueChange={(value) => setCategoryFilter(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories
                          .filter(cat => cat.parent_id === null)
                          .map(cat => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={filteredProducts}
                  searchKey="name"
                  searchPlaceholder="Search products..."
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Categories</CardTitle>
                    <CardDescription>
                      Manage your product categories and hierarchy
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleCategoryAction("add")}>
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 text-left">
                        <th className="py-3 px-4 font-medium">Name</th>
                        <th className="py-3 px-4 font-medium">Slug</th>
                        <th className="py-3 px-4 font-medium">Parent</th>
                        <th className="py-3 px-4 font-medium">Products</th>
                        <th className="py-3 px-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="font-medium">{category.name}</div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {category.slug}
                          </td>
                          <td className="py-3 px-4">
                            {category.parent_id 
                              ? categories.find(c => c.id === category.parent_id)?.name 
                              : "—"}
                          </td>
                          <td className="py-3 px-4">
                            {category.products_count}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleCategoryAction("edit", category)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteCategory(category.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="flagged" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Products</CardTitle>
                <CardDescription>
                  Products that have been flagged for review
                </CardDescription>
              </CardHeader>
              <CardContent>
                {products.filter(p => p.status === "flagged").length > 0 ? (
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 text-left">
                          <th className="py-3 px-4 font-medium">Product</th>
                          <th className="py-3 px-4 font-medium">Seller</th>
                          <th className="py-3 px-4 font-medium">Price</th>
                          <th className="py-3 px-4 font-medium">Flagged On</th>
                          <th className="py-3 px-4 font-medium">Reason</th>
                          <th className="py-3 px-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.filter(p => p.status === "flagged").map((product) => (
                          <tr key={product.id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="font-medium">{product.name}</div>
                            </td>
                            <td className="py-3 px-4">
                              {product.seller}
                            </td>
                            <td className="py-3 px-4">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              {new Date(product.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              Potential counterfeit product
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="outline" size="sm" className="mr-2">
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-md border">
                    <p className="text-muted-foreground">No flagged products found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={modalState.isOpen && modalState.type === "approve"}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onConfirm={confirmAction}
        title="Approve Product"
        description="Are you sure you want to approve this product? It will be visible on the marketplace."
        confirmLabel="Approve"
        variant="default"
      />

      <Dialog open={modalState.isOpen && modalState.type === "reject"} onOpenChange={(open) => {
        if (!open) setModalState({ ...modalState, isOpen: false });
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Product</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this product.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for rejection"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalState({ ...modalState, isOpen: false })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmAction}>
              Reject Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        isOpen={modalState.isOpen && modalState.type === "flag"}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onConfirm={confirmAction}
        title="Flag Product"
        description="Are you sure you want to flag this product for review? It will be hidden from the marketplace until reviewed."
        confirmLabel="Flag Product"
        variant="destructive"
      />

      {/* Category Modal */}
      <Dialog open={categoryModal.isOpen} onOpenChange={(open) => {
        if (!open) setCategoryModal({ ...categoryModal, isOpen: false });
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {categoryModal.type === "add" ? "Add Category" : "Edit Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Electronics"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug
              </label>
              <Input
                id="slug"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
                placeholder="e.g. electronics"
              />
              <p className="text-xs text-muted-foreground">
                Used in URLs, automatically generated if left empty
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="parent" className="text-sm font-medium">
                Parent Category
              </label>
              <Select
                value={newCategoryParent || ""}
                onValueChange={(value) => setNewCategoryParent(value === "" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="No parent (top level)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No parent (top level)</SelectItem>
                  {categories.filter(cat => cat.parent_id === null).map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryModal({ ...categoryModal, isOpen: false })}>
              Cancel
            </Button>
            <Button onClick={saveCategoryChanges}>
              {categoryModal.type === "add" ? "Add Category" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProductManagement;
