
import React from "react";
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
  Users,
  ShoppingBasket,
  AlertTriangle,
  Bell,
  TrendingUp,
  ShoppingCart,
  Activity,
  CheckCircle
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
  { name: "Jul", sales: 7000 },
];

const sellerData = [
  { name: "Jan", active: 10, new: 5 },
  { name: "Feb", active: 15, new: 7 },
  { name: "Mar", active: 20, new: 8 },
  { name: "Apr", active: 25, new: 12 },
  { name: "May", active: 30, new: 9 },
  { name: "Jun", active: 35, new: 15 },
  { name: "Jul", active: 40, new: 10 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your marketplace performance and activity
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardStats
            title="Total Sellers"
            value="256"
            trend={{ value: 12, isPositive: true }}
            icon={Users}
          />
          <CardStats
            title="Active Products"
            value="1,423"
            trend={{ value: 8, isPositive: true }}
            icon={ShoppingBasket}
          />
          <CardStats
            title="Pending Approvals"
            value="24"
            trend={{ value: 4, isPositive: false }}
            icon={Bell}
          />
          <CardStats
            title="Flagged Items"
            value="8"
            trend={{ value: 2, isPositive: false }}
            icon={AlertTriangle}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>Monthly Sales</span>
              </CardTitle>
              <CardDescription>Total sales over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
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
                <Users className="h-5 w-5" />
                <span>Seller Growth</span>
              </CardTitle>
              <CardDescription>New and active sellers per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sellerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" fill="#8884d8" name="Active Sellers" />
                    <Bar dataKey="new" fill="#82ca9d" name="New Sellers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Top Products</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { name: "Wireless Earbuds", sales: 54, change: "+12%" },
                  { name: "Smart Watch", sales: 43, change: "+8%" },
                  { name: "Phone Case", sales: 38, change: "+5%" },
                  { name: "Bluetooth Speaker", sales: 32, change: "+3%" },
                  { name: "USB-C Cable", sales: 28, change: "+2%" },
                ].map((product, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sold
                      </p>
                    </div>
                    <span className="text-sm text-green-500">{product.change}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Top Sellers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { name: "TechStore", sales: "$12,354", change: "+18%" },
                  { name: "HomeGoods", sales: "$9,876", change: "+12%" },
                  { name: "FashionTrends", sales: "$8,432", change: "+9%" },
                  { name: "ElectronicsHQ", sales: "$7,654", change: "+7%" },
                  { name: "HealthyLiving", sales: "$6,543", change: "+4%" },
                ].map((seller, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {seller.sales} revenue
                      </p>
                    </div>
                    <span className="text-sm text-green-500">{seller.change}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { action: "New seller verification", time: "10 minutes ago", icon: CheckCircle, status: "success" },
                  { action: "Product approved", time: "25 minutes ago", icon: CheckCircle, status: "success" },
                  { action: "Seller suspended", time: "1 hour ago", icon: AlertTriangle, status: "warning" },
                  { action: "Product flagged", time: "2 hours ago", icon: AlertTriangle, status: "warning" },
                  { action: "System update", time: "4 hours ago", icon: Activity, status: "info" },
                ].map((activity, i) => {
                  const Icon = activity.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-1 ${
                        activity.status === "success" ? "bg-green-100 text-green-600" : 
                        activity.status === "warning" ? "bg-yellow-100 text-yellow-600" : 
                        "bg-blue-100 text-blue-600"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
