
import { User, Mail, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalInfoProps {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  email: string;
  phone: string;
  website?: string;
}

export function PersonalInfoCard({
  firstName,
  middleName,
  lastName,
  suffix,
  email,
  phone,
  website,
}: PersonalInfoProps) {
  const fullName = [firstName, middleName, lastName, suffix]
    .filter(Boolean)
    .join(" ");

  return (
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
          <span>{fullName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{phone}</span>
        </div>
        {website && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span>{website}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
