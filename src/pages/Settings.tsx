
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Mail, 
  Globe, 
  Shield, 
  MessageSquare,
  HelpCircle,
  BarChart,
  Palette
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [sellerReports, setSellerReports] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  
  const [accentColor, setAccentColor] = useState("default");
  const [borderRadius, setBorderRadius] = useState("default");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("UTC-7");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••••••••••");
  const [webhookUrl, setWebhookUrl] = useState("https://example.com/webhook");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Admin Profile</span>
                </CardTitle>
                <CardDescription>
                  Update your admin account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="User" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Admin Role</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Content Moderator</SelectItem>
                      <SelectItem value="analytics">Analytics Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Setup 2FA</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Active Sessions</Label>
                    <p className="text-sm text-muted-foreground">
                      Manage your active login sessions
                    </p>
                  </div>
                  <Button variant="outline">Manage Sessions</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>
                  Control what notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label htmlFor="email-notifications">All Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive all notification emails
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and updates
                      </p>
                    </div>
                    <Switch 
                      id="marketing-emails" 
                      checked={marketingEmails} 
                      onCheckedChange={setMarketingEmails} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label htmlFor="seller-reports">Seller Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily summary of seller activities
                      </p>
                    </div>
                    <Switch 
                      id="seller-reports" 
                      checked={sellerReports} 
                      onCheckedChange={setSellerReports} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label htmlFor="security-alerts">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts about suspicious activities
                      </p>
                    </div>
                    <Switch 
                      id="security-alerts" 
                      checked={securityAlerts} 
                      onCheckedChange={setSecurityAlerts} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">In-App Notifications</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-seller-verification" defaultChecked />
                      <Label htmlFor="notification-seller-verification">Seller verification requests</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-product-approval" defaultChecked />
                      <Label htmlFor="notification-product-approval">Product approval requests</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-flagged" defaultChecked />
                      <Label htmlFor="notification-flagged">Flagged content alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-system" defaultChecked />
                      <Label htmlFor="notification-system">System updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-analytics" defaultChecked />
                      <Label htmlFor="notification-analytics">Analytics reports</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  <span>Appearance Settings</span>
                </CardTitle>
                <CardDescription>
                  Customize how the admin dashboard looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Theme</h3>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={theme === "light" ? "default" : "outline"} 
                      className="w-full" 
                      onClick={() => theme === "dark" && toggleTheme()}
                    >
                      Light
                    </Button>
                    <Button 
                      variant={theme === "dark" ? "default" : "outline"} 
                      className="w-full" 
                      onClick={() => theme === "light" && toggleTheme()}
                    >
                      Dark
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Accent Color</h3>
                  <RadioGroup 
                    defaultValue={accentColor} 
                    onValueChange={setAccentColor}
                    className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                  >
                    <div>
                      <RadioGroupItem value="default" id="color-default" className="sr-only" />
                      <Label
                        htmlFor="color-default"
                        className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        Default
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="blue" id="color-blue" className="sr-only" />
                      <Label
                        htmlFor="color-blue"
                        className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-blue-100 p-4 hover:bg-blue-200 [&:has([data-state=checked])]:border-blue-800"
                      >
                        Blue
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="green" id="color-green" className="sr-only" />
                      <Label
                        htmlFor="color-green"
                        className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-green-100 p-4 hover:bg-green-200 [&:has([data-state=checked])]:border-green-800"
                      >
                        Green
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="purple" id="color-purple" className="sr-only" />
                      <Label
                        htmlFor="color-purple"
                        className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-purple-100 p-4 hover:bg-purple-200 [&:has([data-state=checked])]:border-purple-800"
                      >
                        Purple
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Border Radius</h3>
                  <RadioGroup 
                    defaultValue={borderRadius} 
                    onValueChange={setBorderRadius}
                    className="grid grid-cols-3 gap-2"
                  >
                    <div>
                      <RadioGroupItem value="default" id="radius-default" className="sr-only" />
                      <Label
                        htmlFor="radius-default"
                        className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        Default
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="smooth" id="radius-smooth" className="sr-only" />
                      <Label
                        htmlFor="radius-smooth"
                        className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        Smooth
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="square" id="radius-square" className="sr-only" />
                      <Label
                        htmlFor="radius-square"
                        className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        Square
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Interface Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable animations throughout the interface
                    </p>
                  </div>
                  <Switch 
                    id="animations" 
                    checked={animationsEnabled} 
                    onCheckedChange={setAnimationsEnabled} 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Appearance</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="localization" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>Localization Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure regional and language preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-12">(UTC-12:00) International Date Line West</SelectItem>
                      <SelectItem value="UTC-8">(UTC-08:00) Pacific Time (US & Canada)</SelectItem>
                      <SelectItem value="UTC-7">(UTC-07:00) Mountain Time (US & Canada)</SelectItem>
                      <SelectItem value="UTC-6">(UTC-06:00) Central Time (US & Canada)</SelectItem>
                      <SelectItem value="UTC-5">(UTC-05:00) Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="UTC">(UTC) Coordinated Universal Time</SelectItem>
                      <SelectItem value="UTC+1">(UTC+01:00) Central European Time</SelectItem>
                      <SelectItem value="UTC+8">(UTC+08:00) Beijing, Hong Kong, Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                      <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency Display</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                      <SelectItem value="cny">CNY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Localization</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  <span>API Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage API access and integration preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex">
                    <Input id="api-key" value={apiKey} readOnly className="rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This key provides full access to your admin API
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    value={webhookUrl} 
                    onChange={(e) => setWebhookUrl(e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">
                    URL to receive webhook notifications
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Webhook Events</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="webhook-seller-verification" defaultChecked />
                      <Label htmlFor="webhook-seller-verification">Seller verification status changes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="webhook-product-approval" defaultChecked />
                      <Label htmlFor="webhook-product-approval">Product approval status changes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="webhook-security-alerts" defaultChecked />
                      <Label htmlFor="webhook-security-alerts">Security alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="webhook-reports" />
                      <Label htmlFor="webhook-reports">Analytics reports</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="test-webhook">Test Webhook</Label>
                  <Button variant="outline" className="w-full">Send Test Webhook</Button>
                  <p className="text-xs text-muted-foreground">
                    Sends a test payload to your configured webhook URL
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset Defaults</Button>
                <Button>Save API Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
