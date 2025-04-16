
import { FileText, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";

interface VerificationInfoProps {
  documentType: string;
  documentUrl: string;
  governmentIdType: string;
  governmentIdUrl: string;
  status: string;
  verifiedBy?: string;
  verificationDate?: string;
  notes: string;
  onNotesChange: (notes: string) => void;
  onApprove: () => void;
  onReject: () => void;
}

export function VerificationInfoCard({
  documentType,
  documentUrl,
  governmentIdType,
  governmentIdUrl,
  status,
  verifiedBy,
  verificationDate,
  notes,
  onNotesChange,
  onApprove,
  onReject,
}: VerificationInfoProps) {
  const showVerificationActions = status === "pending";

  return (
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
              <label className="text-sm font-medium text-muted-foreground">Business Document</label>
              <p>{documentType}</p>
              <a href={documentUrl} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View Document
              </a>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Government ID</label>
              <p>{governmentIdType}</p>
              <a href={governmentIdUrl} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View ID
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <StatusBadge
                  variant={status === "pending" ? "pending" : "success"}
                  label={status.charAt(0).toUpperCase() + status.slice(1)}
                />
              </div>
            </div>
            {verifiedBy && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Verified By</label>
                <p>{verifiedBy} on {new Date(verificationDate!).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">
              Admin Notes
            </label>
            <Textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Add verification notes..."
              rows={4}
            />
          </div>

          {showVerificationActions && (
            <div className="flex gap-2 justify-end">
              <Button
                onClick={onApprove}
                className="gap-2"
              >
                <Check className="h-4 w-4" /> Approve
              </Button>
              <Button
                variant="destructive"
                onClick={onReject}
                className="gap-2"
              >
                <X className="h-4 w-4" /> Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
