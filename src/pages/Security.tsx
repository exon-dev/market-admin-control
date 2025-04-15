
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  FileLock2,
  Eye,
  UserCheck,
  FileText,
  Lock,
  FileCheck,
  User,
  CreditCard,
  MessageSquare,
  Clock,
  Search
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";

// Mock data
type SuspiciousActivity = {
  id: string;
  type: "review" | "transaction" | "login" | "account";
  description: string;
  user: string;
  timestamp: string;
  risk: "high" | "medium" | "low";
  status: "pending" | "resolved" | "investigating";
};

const suspiciousActivities: SuspiciousActivity[] = [
  {
    id: "sa1",
    type: "review",
    description: "Multiple 5-star reviews from same IP address",
    user: "user123",
    timestamp: "2023-04-15T08:30:00Z",
    risk: "medium",
    status: "investigating"
  },
  {
    id: "sa2",
    type: "transaction",
    description: "Multiple failed payment attempts",
    user: "buyer456",
    timestamp: "2023-04-15T10:15:00Z",
    risk: "high",
    status: "pending"
  },
  {
    id: "sa3",
    type: "login",
    description: "Login attempt from unusual location",
    user: "seller789",
    timestamp: "2023-04-14T22:45:00Z",
    risk: "medium",
    status: "resolved"
  },
  {
    id: "sa4",
    type: "account",
    description: "Rapid account information changes",
    user: "newuser2023",
    timestamp: "2023-04-14T16:20:00Z",
    risk: "low",
    status: "resolved"
  },
  {
    id: "sa5",
    type: "transaction",
    description: "Unusual high-value transaction pattern",
    user: "premium_customer",
    timestamp: "2023-04-15T12:10:00Z",
    risk: "high",
    status: "pending"
  },
  {
    id: "sa6",
    type: "review",
    description: "Coordinated negative review campaign",
    user: "competitor_suspected",
    timestamp: "2023-04-13T14:30:00Z",
    risk: "high",
    status: "investigating"
  }
];

type AuditLog = {
  id: string;
  action: string;
  admin: string;
  timestamp: string;
  details: string;
  ip_address: string;
};

const auditLogs: AuditLog[] = [
  {
    id: "al1",
    action: "Seller Verification",
    admin: "admin_user",
    timestamp: "2023-04-15T14:25:00Z",
    details: "Verified seller ID: 1",
    ip_address: "192.168.1.100"
  },
  {
    id: "al2",
    action: "Product Approval",
    admin: "content_moderator",
    timestamp: "2023-04-15T13:10:00Z",
    details: "Approved product ID: p2",
    ip_address: "192.168.1.101"
  },
  {
    id: "al3",
    action: "Security Setting Change",
    admin: "system_admin",
    timestamp: "2023-04-15T11:45:00Z",
    details: "Enabled two-factor authentication requirement",
    ip_address: "192.168.1.102"
  },
  {
    id: "al4",
    action: "User Suspension",
    admin: "admin_user",
    timestamp: "2023-04-14T16:30:00Z",
    details: "Suspended user ID: user456 for policy violation",
    ip_address: "192.168.1.100"
  },
  {
    id: "al5",
    action: "Category Creation",
    admin: "content_moderator",
    timestamp: "2023-04-14T14:15:00Z",
    details: "Created new category: 'Smart Devices'",
    ip_address: "192.168.1.101"
  },
  {
    id: "al6",
    action: "System Backup",
    admin: "system_admin",
    timestamp: "2023-04-14T12:00:00Z",
    details: "Initiated manual system backup",
    ip_address: "192.168.1.102"
  },
  {
    id: "al7",
    action: "Product Rejection",
    admin: "content_moderator",
    timestamp: "2023-04-14T10:20:00Z",
    details: "Rejected product ID: p7 for quality issues",
    ip_address: "192.168.1.101"
  }
];

const complianceItems = [
  {
    id: "c1",
    title: "Privacy Policy",
    status: "compliant",
    lastUpdated: "2023-01-15",
    requiredUpdate: false
  },
  {
    id: "c2",
    title: "Terms of Service",
    status: "compliant",
    lastUpdated: "2023-01-15",
    requiredUpdate: false
  },
  {
    id: "c3",
    title: "User Data Processing Agreement",
    status: "compliant",
    lastUpdated: "2023-02-20",
    requiredUpdate: false
  },
  {
    id: "c4",
    title: "Cookie Policy",
    status: "warning",
    lastUpdated: "2022-07-10",
    requiredUpdate: true
  },
  {
    id: "c5",
    title: "Marketplace Seller Agreement",
    status: "compliant",
    lastUpdated: "2023-03-05",
    requiredUpdate: false
  },
  {
    id: "c6",
    title: "Return & Refund Policy",
    status: "compliant",
    lastUpdated: "2023-01-30",
    requiredUpdate: false
  },
  {
    id: "c7",
    title: "Accessibility Statement",
    status: "warning",
    lastUpdated: "2022-05-22",
    requiredUpdate: true
  },
  {
    id: "c8",
    title: "Data Retention Policy",
    status: "compliant",
    lastUpdated: "2023-02-15",
    requiredUpdate: false
  }
];

const securityScoreItems = [
  { name: "Authentication", score: 95, maxScore: 100 },
  { name: "Data Encryption", score: 100, maxScore: 100 },
  { name: "Access Control", score: 85, maxScore: 100 },
  { name: "Vulnerability Management", score: 80, maxScore: 100 },
  { name: "Incident Response", score: 90, maxScore: 100 }
];

const Security = () => {
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [autoBlock, setAutoBlock] = useState(true);
  const [logRetention, setLogRetention] = useState(true);
  
  // Calculate overall security score
  const totalScore = securityScoreItems.reduce((sum, item) => sum + item.score, 0);
  const maxPossibleScore = securityScoreItems.reduce((sum, item) => sum + item.maxScore, 0);
  const overallScore = Math.round((totalScore / maxPossibleScore) * 100);

  const suspiciousActivityColumns: ColumnDef<SuspiciousActivity>[] = [
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        const iconMap = {
          review: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
          transaction: <CreditCard className="h-4 w-4 text-muted-foreground" />,
          login: <User className="h-4 w-4 text-muted-foreground" />,
          account: <UserCheck className="h-4 w-4 text-muted-foreground" />
        };
        
        return (
          <div className="flex items-center gap-2">
            {iconMap[type as keyof typeof iconMap]}
            <span className="capitalize">{type}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "user",
      header: "User"
    },
    {
      accessorKey: "risk",
      header: "Risk Level",
      cell: ({ row }) => {
        const risk = row.original.risk;
        const variantMap = {
          high: "error",
          medium: "warning",
          low: "info"
        };
        
        return (
          <StatusBadge 
            variant={variantMap[risk as keyof typeof variantMap] as any} 
            label={risk.charAt(0).toUpperCase() + risk.slice(1)} 
          />
        );
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const variantMap = {
          pending: "pending",
          investigating: "warning",
          resolved: "success"
        };
        
        return (
          <StatusBadge 
            variant={variantMap[status as keyof typeof variantMap] as any} 
            label={status.charAt(0).toUpperCase() + status.slice(1)} 
          />
        );
      }
    },
    {
      accessorKey: "timestamp",
      header: "Time",
      cell: ({ row }) => {
        return new Date(row.original.timestamp).toLocaleString();
      }
    },
    {
      id: "actions",
      cell: () => (
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      )
    }
  ];

  const auditLogColumns: ColumnDef<AuditLog>[] = [
    {
      accessorKey: "action",
      header: "Action",
    },
    {
      accessorKey: "admin",
      header: "Admin User",
    },
    {
      accessorKey: "details",
      header: "Details"
    },
    {
      accessorKey: "ip_address",
      header: "IP Address"
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => {
        return new Date(row.original.timestamp).toLocaleString();
      }
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security & Compliance</h1>
          <p className="text-muted-foreground">
            Manage security settings, monitor suspicious activity, and ensure compliance
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="suspicious">Suspicious Activity</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Security Score</span>
                  </CardTitle>
                  <CardDescription>
                    Overall platform security assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex h-40 w-40 items-center justify-center rounded-full border-8 border-muted p-4">
                      <div>
                        <div className="text-4xl font-bold">{overallScore}</div>
                        <div className="text-xs text-muted-foreground">out of 100</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {securityScoreItems.map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-sm font-medium">
                            {item.score}/{item.maxScore}
                          </div>
                        </div>
                        <Progress value={(item.score / item.maxScore) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure platform security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <div className="text-sm font-medium">Data Encryption</div>
                      <div className="text-xs text-muted-foreground">
                        Enable end-to-end encryption for all data
                      </div>
                    </div>
                    <Switch 
                      checked={encryptionEnabled} 
                      onCheckedChange={setEncryptionEnabled} 
                      id="encryption-toggle"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <div className="text-sm font-medium">Two-Factor Authentication</div>
                      <div className="text-xs text-muted-foreground">
                        Require 2FA for all admin accounts
                      </div>
                    </div>
                    <Switch 
                      checked={twoFactorRequired} 
                      onCheckedChange={setTwoFactorRequired} 
                      id="two-factor-toggle"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <div className="text-sm font-medium">Suspicious Activity Blocking</div>
                      <div className="text-xs text-muted-foreground">
                        Automatically block suspicious login attempts
                      </div>
                    </div>
                    <Switch 
                      checked={autoBlock} 
                      onCheckedChange={setAutoBlock} 
                      id="autoblock-toggle"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <div className="text-sm font-medium">Extended Log Retention</div>
                      <div className="text-xs text-muted-foreground">
                        Keep security logs for 1 year (default: 90 days)
                      </div>
                    </div>
                    <Switch 
                      checked={logRetention} 
                      onCheckedChange={setLogRetention} 
                      id="log-retention-toggle"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Security Settings</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Recent Security Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suspiciousActivities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-1.5 ${
                        activity.risk === "high" ? "bg-red-100 text-red-600" : 
                        activity.risk === "medium" ? "bg-yellow-100 text-yellow-600" : 
                        "bg-blue-100 text-blue-600"
                      }`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-medium">{activity.description}</p>
                          <div className="flex items-center gap-2">
                            <StatusBadge 
                              variant={activity.risk === "high" ? "error" : activity.risk === "medium" ? "warning" : "info"} 
                              label={activity.risk.charAt(0).toUpperCase() + activity.risk.slice(1)} 
                            />
                            <span className="text-xs text-muted-foreground">
                              {new Date(activity.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          User: {activity.user} | Type: {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => document.querySelector('button[value="suspicious"]') && (document.querySelector('button[value="suspicious"]') as HTMLButtonElement).click()}>
                  View All Suspicious Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="suspicious" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Suspicious Activity Monitor</span>
                </CardTitle>
                <CardDescription>
                  Monitor and manage suspicious activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={suspiciousActivityColumns}
                  data={suspiciousActivities}
                  searchKey="description"
                  searchPlaceholder="Search activities..."
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Legal Document Compliance</span>
                </CardTitle>
                <CardDescription>
                  Ensure all legal documents are up-to-date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 text-left">
                        <th className="py-3 px-4 font-medium">Document</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium">Last Updated</th>
                        <th className="py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceItems.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{item.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge 
                              variant={item.status === "compliant" ? "success" : "warning"} 
                              label={item.status.charAt(0).toUpperCase() + item.status.slice(1)} 
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{item.lastUpdated}</span>
                              {item.requiredUpdate && (
                                <span className="text-xs text-red-500">Update required</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                                <span className="ml-1">View</span>
                              </Button>
                              {item.requiredUpdate && (
                                <Button size="sm">
                                  <FileCheck className="h-4 w-4" />
                                  <span className="ml-1">Update</span>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileLock2 className="h-5 w-5" />
                  <span>Data Protection Assessment</span>
                </CardTitle>
                <CardDescription>
                  Review of data protection measures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium">GDPR Compliance Status</h3>
                    <div className="mt-2 flex items-center">
                      <div className="h-2 flex-1 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "95%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">95% Compliant</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Last audit: 2023-03-15 | Next scheduled audit: 2023-09-15
                    </p>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Data Processing Records</h3>
                      <p className="text-sm text-muted-foreground">Complete and up-to-date</p>
                      <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                        View Records
                      </Button>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Data Breach Response Plan</h3>
                      <p className="text-sm text-muted-foreground">Last tested: 2023-02-20</p>
                      <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                        View Plan
                      </Button>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Subject Access Request Process</h3>
                      <p className="text-sm text-muted-foreground">Avg. response time: 3 days</p>
                      <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                        View Process
                      </Button>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Privacy Impact Assessments</h3>
                      <p className="text-sm text-muted-foreground">5 completed, 1 pending</p>
                      <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                        View Assessments
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audit" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  <span>Audit Trail Logs</span>
                </CardTitle>
                <CardDescription>
                  Records of all administrative actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search audit logs..." 
                    className="max-w-sm"
                  />
                </div>
                
                <DataTable
                  columns={auditLogColumns}
                  data={auditLogs}
                  searchKey="action"
                  searchPlaceholder="Search actions..."
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline">Export Logs</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Security;
