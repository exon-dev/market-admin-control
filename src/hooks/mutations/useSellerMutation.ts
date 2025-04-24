import { useMutation } from "@tanstack/react-query";
import { updateSellerVerification } from "@/lib/sellers";

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
