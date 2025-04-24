import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts";
import { Button } from "@/components/ui/button";
import {
	ChevronRight,
	ShoppingCart,
	Store,
	Shield,
	BarChart4,
} from "lucide-react";

export const LandingPage: React.FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="relative bg-gradient-to-b from-primary/20 to-background">
				<div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
							Market Admin Control
						</h1>
						<p className="mt-6 text-xl text-muted-foreground">
							A modern platform for managing your market profiles and vendors
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							{isAuthenticated ? (
								<Button size="lg" onClick={() => navigate("/dashboard")}>
									Go to Dashboard
									<ChevronRight className="ml-2 h-4 w-4" />
								</Button>
							) : (
								<>
									<Button size="lg" onClick={() => navigate("/signup")}>
										Get Started
										<ChevronRight className="ml-2 h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="lg"
										onClick={() => navigate("/signin")}
									>
										Sign In
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Features */}
			<div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Everything you need to manage your market
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Our platform provides powerful tools for both customers and vendors.
					</p>
				</div>

				<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{/* Feature 1 */}
					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
							<ShoppingCart className="h-6 w-6 text-primary" />
						</div>
						<h3 className="mt-4 text-lg font-medium">Customer Management</h3>
						<p className="mt-2 text-muted-foreground">
							Track customer profiles, orders, and preferences in one place.
						</p>
					</div>

					{/* Feature 2 */}
					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
							<Store className="h-6 w-6 text-primary" />
						</div>
						<h3 className="mt-4 text-lg font-medium">Vendor Management</h3>
						<p className="mt-2 text-muted-foreground">
							Easily manage vendor onboarding, products, and performance
							metrics.
						</p>
					</div>

					{/* Feature 3 */}
					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
							<Shield className="h-6 w-6 text-primary" />
						</div>
						<h3 className="mt-4 text-lg font-medium">Secure Authentication</h3>
						<p className="mt-2 text-muted-foreground">
							Role-based access control and secure user authentication.
						</p>
					</div>

					{/* Feature 4 */}
					<div className="rounded-lg border bg-card p-6 shadow-sm sm:col-span-2 lg:col-span-1">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
							<BarChart4 className="h-6 w-6 text-primary" />
						</div>
						<h3 className="mt-4 text-lg font-medium">Analytics & Insights</h3>
						<p className="mt-2 text-muted-foreground">
							Gain valuable insights with advanced analytics and reporting
							tools.
						</p>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="bg-primary/5">
				<div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
					<div className="mx-auto max-w-4xl text-center">
						<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Ready to get started?
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Join thousands of businesses already using our platform to manage
							their markets.
						</p>
						<div className="mt-8 flex justify-center">
							{isAuthenticated ? (
								<Button size="lg" onClick={() => navigate("/dashboard")}>
									Go to Dashboard
								</Button>
							) : (
								<Button size="lg" onClick={() => navigate("/signup")}>
									Create an Account
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="border-t">
				<div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
					<p className="text-center text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} Market Admin Control. All rights
						reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};
