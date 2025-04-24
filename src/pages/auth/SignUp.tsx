import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Store } from "lucide-react";
import { useAuth } from "@/contexts";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [accountType, setAccountType] = useState<"admin">("admin"); // Admin-only app
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		storeName: "",
	});

	const { signUp, isAuthenticated } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();

	// Redirect if already authenticated
	React.useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.email || !formData.password || !formData.name) {
			toast({
				title: "Error",
				description: "Please fill in all required fields.",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);

		try {
			console.log("Attempting to sign up with:", {
				email: formData.email,
				role: accountType,
			});

			const { error } = await signUp({
				email: formData.email,
				password: formData.password,
				full_name: formData.name,
				role: accountType,
			});

			if (error) {
				throw error;
			}

			toast({
				title: "Success",
				description:
					"Account created successfully. Please check your email to confirm your account.",
			});

			// Redirect to sign in
			setTimeout(() => {
				navigate("/signin");
			}, 1500);
		} catch (error: any) {
			console.error("Sign up error:", error);
			toast({
				title: "Error",
				description:
					error.message || "Failed to create account. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<h1 className="text-2xl font-bold">Create Admin Account</h1>
					<p className="text-muted-foreground mt-2">Sign up to get started</p>
				</div>

				<Alert variant="default" className="bg-blue-50 border-blue-200">
					<AlertCircle className="h-4 w-4 text-blue-600" />
					<AlertTitle className="text-blue-800">Admin Only</AlertTitle>
					<AlertDescription className="text-blue-700">
						This is an admin-only application. You'll have full access to manage
						the market platform.
					</AlertDescription>
				</Alert>

				<form onSubmit={handleSubmit} className="mt-4 space-y-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<div className="relative">
								<User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="name"
									type="text"
									placeholder="Enter your full name"
									className="pl-10"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									required
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									className="pl-10"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									required
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Create a password"
									className="pl-10 pr-10"
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									required
									disabled={isLoading}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
									disabled={isLoading}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Creating Account..." : "Sign up"}
					</Button>

					<div className="text-center text-sm">
						<span className="text-muted-foreground">
							Already have an account?{" "}
						</span>
						<Link to="/signin" className="font-semibold hover:underline">
							Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
