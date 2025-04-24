
import React from "react";
import { StatusBadge } from "@/components/ui/status-badge";

interface SellerDetailsHeaderProps {
  businessName: string;
  sellerId: string;
  status: string;
}

export function SellerDetailsHeader({ businessName, sellerId, status }: SellerDetailsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{businessName}</h1>
        <p className="text-muted-foreground">Seller ID: {sellerId}</p>
      </div>
      <StatusBadge
        variant={status === "pending" ? "pending" : "success"}
        label={status.charAt(0).toUpperCase() + status.slice(1)}
      />
    </div>
  );
}
