import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/contexts";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { signIn, isAuthenticated } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();

	// Redirect if already authenticated
	React.useEffect(() => {
		if (isAuthenticated) {
			console.log("User already authenticated, redirecting to dashboard");
			navigate("/dashboard");
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!formData.email || !formData.password) {
			setError("Please enter both email and password.");
			return;
		}

		setIsLoading(true);

		try {
			console.log("Attempting to sign in with:", formData.email);

			const { error, session } = await signIn({
				email: formData.email,
				password: formData.password,
			});

			if (error) {
				throw error;
			}

			if (!session) {
				throw new Error("No session returned from sign in");
			}

			toast({
				title: "Success",
				description: "Signed in successfully.",
			});

			console.log("Sign in successful, redirecting to dashboard");
			navigate("/dashboard");
		} catch (err: any) {
			console.error("Sign in error:", err);

			setError(err.message || "Failed to sign in. Please try again.");

			toast({
				title: "Error",
				description: err.message || "Failed to sign in. Please try again.",
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
					<h1 className="text-2xl font-bold">Admin Sign In</h1>
					<p className="text-muted-foreground mt-2">
						Sign in to your admin account
					</p>
				</div>

				{error && (
					<Alert variant="destructive" className="border-red-500">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<div className="space-y-4">
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
									placeholder="Enter your password"
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
						{isLoading ? "Signing in..." : "Sign in"}
					</Button>

					<div className="text-center text-sm">
						<span className="text-muted-foreground">
							Don't have an account?{" "}
						</span>
						<Link to="/signup" className="font-semibold hover:underline">
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
