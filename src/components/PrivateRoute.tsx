import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			console.log("User not authenticated, redirecting to signin");
		}
	}, [isAuthenticated, isLoading, navigate]);

	// Show loading or redirect to login if not authenticated
	if (isLoading) {
		// You could replace this with a loading spinner component
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/signin" replace />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
