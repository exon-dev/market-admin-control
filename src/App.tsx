import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "./contexts";
import PrivateRoute from "@/components/PrivateRoute";

// Pages
import { LandingPage, Dashboard, ProfilePage } from "./pages";

// Auth Pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Dashboard Pages
import SellerManagement from "./pages/SellerManagement";
import SellerDetails from "./pages/SellerDetails";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Account Pages
import MyAccount from "./pages/account/MyAccount";
import Profile from "./pages/account/Profile";
import AuditLogs from "./pages/account/AuditLogs";
import ProductManagement from "./pages/ProductManagement";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider>
			<AuthProvider>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/signin" element={<SignIn />} />
							<Route path="/signup" element={<SignUp />} />
							<Route
								path="/dashboard"
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="/sellers" element={<SellerManagement />} />
							<Route path="/sellers/:id" element={<SellerDetails />} />
							<Route path="/products" element={<ProductManagement />} />
							<Route path="/analytics" element={<Analytics />} />
							<Route path="/security" element={<Security />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/account" element={<MyAccount />} />
							<Route path="/audit-logs" element={<AuditLogs />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</TooltipProvider>
			</AuthProvider>
		</ThemeProvider>
	</QueryClientProvider>
);

export default App;
