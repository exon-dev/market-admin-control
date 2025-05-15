import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSellerVerification, deleteSellerVerification } from "@/lib/sellers";

export const useUpdateSellerVerificationMutation = (
	status: string,
	seller_id: string,
) => {
	return useMutation({
		mutationFn: () => updateSellerVerification(seller_id, status),
		onSuccess: () => {
			console.log("Seller verification updated successfully");
		},
		onError: (error) => {
			console.error("Error updating seller verification:", error);
		},
	});
};

export const useDeleteSellerMutation = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: (sellerId: string) => deleteSellerVerification(sellerId),
		onSuccess: () => {
			// Invalidate queries to refetch data
			queryClient.invalidateQueries({ queryKey: ["all-sellers"] });
			queryClient.invalidateQueries({ queryKey: ["seller-verification"] });
			queryClient.invalidateQueries({ queryKey: ["verified-sellers"] });
			queryClient.invalidateQueries({ queryKey: ["sellers-by-status"] });
			console.log("Seller deleted successfully");
		},
		onError: (error) => {
			console.error("Error deleting seller:", error);
		},
	});
};
