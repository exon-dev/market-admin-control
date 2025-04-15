
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CardStats } from "@/components/ui/card-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart as BarChartIcon,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Users,
  DollarSign,
  Activity,
  Clock,
  Zap,
  Eye
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for charts
const salesData = [
  { name: "Jan", sales: 4000, orders: 240 },
  { name: "Feb", sales: 3000, orders: 180 },
  { name: "Mar", sales: 5000, orders: 300 },
  { name: "Apr", sales: 4500, orders: 270 },
  { name: "May", sales: 6000, orders: 360 },
  { name: "Jun", sales: 5500, orders: 330 },
  { name: "Jul", sales: 7000, orders: 420 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home & Kitchen", value: 20 },
  { name: "Books", value: 10 },
  { name: "Beauty", value: 10 },
];

const pieColors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

const trafficData = [
  { name: "Mon", direct: 4000, organic: 2400, referral: 1800 },
  { name: "Tue", direct: 3500, organic: 2100, referral: 1600 },
  { name: "Wed", direct: 5000, organic: 3000, referral: 2000 },
  { name: "Thu", direct: 4200, organic: 2700, referral: 1900 },
  { name: "Fri", direct: 6000, organic: 3800, referral: 2700 },
  { name: "Sat", direct: 4800, organic: 2900, referral: 2200 },
  { name: "Sun", direct: 3800, organic: 2300, referral: 1700 },
];

const topSellerData = [
  { name: "Tech Solutions Inc", revenue: 25000, growth: "+15%" },
  { name: "Fashion Forward", revenue: 18500, growth: "+8%" },
  { name: "Home Essentials", revenue: 16800, growth: "+12%" },
  { name: "Artisan Crafts", revenue: 12400, growth: "+5%" },
  { name: "Electronics HQ", revenue: 10500, growth: "+10%" },
];

const inventoryAlerts = [
  { id: "p1", name: "Wireless Earbuds", seller: "Tech Solutions Inc", stock: 5, threshold: 10 },
  { id: "p2", name: "Smart Watch", seller: "Tech Solutions Inc", stock: 3, threshold: 5 },
  { id: "p3", name: "Bluetooth Speaker", seller: "Electronics HQ", stock: 2, threshold: 5 },
  { id: "p4", name: "USB-C Cable", seller: "Electronics HQ", stock: 8, threshold: 15 },
  { id: "p5", name: "Leather Wallet", seller: "Fashion Forward", stock: 4, threshold: 10 },
];

const systemLogs = [
  { id: "log1", type: "error", message: "Payment gateway timeout", timestamp: "2023-04-15T10:30:00Z" },
  { id: "log2", type: "warning", message: "High server load detected", timestamp: "2023-04-15T11:45:00Z" },
  { id: "log3", type: "info", message: "Scheduled maintenance completed", timestamp: "2023-04-15T13:20:00Z" },
  { id: "log4", type: "error", message: "Database connection failure", timestamp: "2023-04-14T22:15:00Z" },
  { id: "log5", type: "info", message: "New seller registration spike", timestamp: "2023-04-14T14:10:00Z" },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
            <p className="text-muted-foreground">
              Monitor performance, sales, and marketplace activity
            </p>
          </div>
          <div className="mt-2 sm:mt-0">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardStats
            title="Total Revenue"
            value="$35,687"
            trend={{ value: 12, isPositive: true }}
            icon={DollarSign}
          />
          <CardStats
            title="Total Orders"
            value="1,856"
            trend={{ value: 8, isPositive: true }}
            icon={ShoppingCart}
          />
          <CardStats
            title="Active Sellers"
            value="256"
            trend={{ value: 5, isPositive: true }}
            icon={Users}
          />
          <CardStats
            title="Server Uptime"
            value="99.98%"
            trend={{ value: 0.01, isPositive: false }}
            icon={Zap}
          />
        </div>

        <Tabs defaultValue="sales">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Sales Revenue</span>
                  </CardTitle>
                  <CardDescription>Monthly sales revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5" />
                    <span>Order Volume</span>
                  </CardTitle>
                  <CardDescription>Monthly order count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="orders" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Sales by Category</span>
                  </CardTitle>
                  <CardDescription>Distribution of sales across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Low Stock Alerts</span>
                  </CardTitle>
                  <CardDescription>Products below threshold</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 text-left">
                          <th className="py-2 px-4 font-medium">Product</th>
                          <th className="py-2 px-4 font-medium">Seller</th>
                          <th className="py-2 px-4 font-medium">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryAlerts.map((product) => (
                          <tr key={product.id} className="border-b">
                            <td className="py-2 px-4 font-medium">
                              {product.name}
                            </td>
                            <td className="py-2 px-4">
                              {product.seller}
                            </td>
                            <td className="py-2 px-4">
                              <div className="flex items-center">
                                <span className="text-red-500 font-medium mr-1">{product.stock}</span>
                                <span className="text-xs text-muted-foreground">
                                  / {product.threshold}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="traffic" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span>Traffic Sources</span>
                </CardTitle>
                <CardDescription>Distribution of traffic by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="direct"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                      <Area
                        type="monotone"
                        dataKey="organic"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                      <Area
                        type="monotone"
                        dataKey="referral"
                        stackId="1"
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sellers" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Top Performing Sellers</span>
                </CardTitle>
                <CardDescription>Based on revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 text-left">
                        <th className="py-3 px-4 font-medium">Seller</th>
                        <th className="py-3 px-4 font-medium">Revenue</th>
                        <th className="py-3 px-4 font-medium">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topSellerData.map((seller, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground mr-2">
                                {index + 1}
                              </div>
                              <span className="font-medium">{seller.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            ${seller.revenue.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-green-500">
                            {seller.growth}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    <span>System Logs</span>
                  </CardTitle>
                  <CardDescription>Recent system events and errors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemLogs.map((log) => (
                      <div key={log.id} className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-1 ${
                          log.type === "error" ? "bg-red-100 text-red-600" : 
                          log.type === "warning" ? "bg-yellow-100 text-yellow-600" : 
                          "bg-blue-100 text-blue-600"
                        }`}>
                          {log.type === "error" ? <AlertTriangle className="h-4 w-4" /> : 
                           log.type === "warning" ? <AlertTriangle className="h-4 w-4" /> : 
                           <Activity className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="font-medium">{log.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(log.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-xs uppercase text-muted-foreground mt-1">
                            {log.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>System Uptime</span>
                  </CardTitle>
                  <CardDescription>Server performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        API Server
                      </p>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "99.98%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <p>Uptime: 99.98%</p>
                        <p>Last 30 days</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Database Server
                      </p>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "99.5%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <p>Uptime: 99.5%</p>
                        <p>Last 30 days</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Storage Server
                      </p>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <p>Uptime: 100%</p>
                        <p>Last 30 days</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Payment Gateway
                      </p>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: "98.2%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <p>Uptime: 98.2%</p>
                        <p>Last 30 days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
