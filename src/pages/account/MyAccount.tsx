
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";

const MyAccount = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Admin User</h3>
                  <p className="text-sm text-muted-foreground">Super Admin</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex mt-1">
                      <div className="relative flex-1">
                        <Input
                          id="email"
                          type="email"
                          value="admin@example.com"
                          readOnly
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex mt-1">
                      <div className="relative flex-1">
                        <Input
                          id="phone"
                          type="tel"
                          value="+1 234 567 890"
                          readOnly
                          className="pl-10"
                        />
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Update Information</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyAccount;
