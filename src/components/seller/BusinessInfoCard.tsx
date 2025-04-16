
import { Store, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BusinessInfoProps {
  businessName: string;
  sellerType: string;
  tinNumber: string;
  vatStatus: string;
  registeredAddress: string;
  zipCode: string;
  dtiCertificationNumber: string;
  dtiCertificationExpiry: string;
}

export function BusinessInfoCard({
  businessName,
  sellerType,
  tinNumber,
  vatStatus,
  registeredAddress,
  zipCode,
  dtiCertificationNumber,
  dtiCertificationExpiry,
}: BusinessInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          <span>Business Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Business Name</label>
          <p>{businessName}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Business Type</label>
          <p>{sellerType}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">TIN Number</label>
          <p>{tinNumber}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">VAT Status</label>
          <p>{vatStatus}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">DTI Certificate</label>
          <p>
            {dtiCertificationNumber} (Expires: {new Date(dtiCertificationExpiry).toLocaleDateString()})
          </p>
        </div>
        <div className="flex gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
          <div>
            <p>{registeredAddress}</p>
            <p className="text-sm text-muted-foreground">ZIP: {zipCode}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
