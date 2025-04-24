
import React from "react";
import { Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface DocumentPreviewProps {
  title: string;
  description?: string;
  documentType: string;
  documentUrl: string;
  expiryDate?: string;
  certificationNumber?: string;
}

export function DocumentPreview({
  title,
  description,
  documentType,
  documentUrl,
  expiryDate,
  certificationNumber,
}: DocumentPreviewProps) {
  const isPdf = documentUrl.toLowerCase().endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(documentUrl);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border">
          {isImage ? (
            <AspectRatio ratio={16 / 9}>
              <img
                src={documentUrl}
                alt={documentType}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          ) : (
            <div className="flex items-center justify-center py-10 bg-muted">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Document Type: {documentType}
          </p>
          {certificationNumber && (
            <p className="text-sm text-muted-foreground">
              Certification Number: {certificationNumber}
            </p>
          )}
          {expiryDate && (
            <p className="text-sm text-muted-foreground">
              Expires: {new Date(expiryDate).toLocaleDateString()}
            </p>
          )}
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => window.open(documentUrl, '_blank')}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
