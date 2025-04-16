
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, UserCircle, Settings, Shield } from "lucide-react";

const logs = [
  {
    id: 1,
    action: "Login successful",
    timestamp: "2024-04-16 10:30:00",
    icon: UserCircle,
    type: "auth",
  },
  {
    id: 2,
    action: "Updated seller verification status",
    timestamp: "2024-04-16 11:15:00",
    icon: Shield,
    type: "verification",
  },
  {
    id: 3,
    action: "Changed system settings",
    timestamp: "2024-04-16 14:20:00",
    icon: Settings,
    type: "settings",
  },
  {
    id: 4,
    action: "Exported report",
    timestamp: "2024-04-16 16:45:00",
    icon: FileText,
    type: "report",
  },
];

const AuditLogs = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-8">Audit Logs</h1>
        <Card>
          <CardHeader>
            <CardTitle>Activity History</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {logs.map((log) => {
                  const Icon = log.icon;
                  return (
                    <div
                      key={log.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border"
                    >
                      <div className="rounded-full p-2 bg-primary/10">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.timestamp}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {log.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
