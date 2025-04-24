import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductCategory, updateProductCategory } from "@/lib/products";

export const useCreateProductMutation = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: createProductCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productCategories"] });
		},
		onError: (error) => {
			console.error("Error creating product category:", error);
		},
	});
	return mutation;
};

export const useUpdateProductCategoryMutation = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: updateProductCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productCategories"] });
		},
		onError: (error) => {
			console.error("Error updating product category:", error);
		},
	});
	return mutation;
};
