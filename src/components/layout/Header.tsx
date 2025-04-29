import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Bell, Search, User, ChevronDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function Header() {
	const { theme, toggleTheme } = useTheme();
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleLogout = async () => {
		try {
			const { error } = await signOut();
			
			if (error) {
				throw error;
			}
			
			toast({
				title: "Success",
				description: "Signed out successfully.",
			});
			
			navigate("/signin");
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message || "Failed to sign out. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<header className="sticky top-0 z-30 h-16 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-full items-center justify-between px-4">
				<div className="flex items-center gap-2 lg:w-1/3">
					<div className="hidden sm:block w-full max-w-md">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search..."
								className="w-full rounded-md border bg-background pl-8 focus-visible:ring-offset-0"
							/>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<button
						onClick={toggleTheme}
						className="rounded-md p-1 hover:bg-accent"
						aria-label="Toggle theme"
					>
						{theme === "light" ? (
							<Moon className="h-5 w-5" />
						) : (
							<Sun className="h-5 w-5" />
						)}
					</button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="flex items-center gap-2 rounded-md p-1 hover:bg-accent">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<User className="h-4 w-4" />
								</div>
								<span className="hidden md:inline">Admin User</span>
								<ChevronDown className="h-4 w-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => navigate("/profile")}>My Account</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
