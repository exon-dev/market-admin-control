
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle } from "lucide-react";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <UserCircle className="h-12 w-12" />
                  </div>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    Change
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Admin" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="User" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short bio about yourself..."
                    className="h-32"
                  />
                </div>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
