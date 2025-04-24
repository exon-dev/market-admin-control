import { useQuery } from "@tanstack/react-query";
import {
	fetchAllProducts,
	fetchProductById,
	fetchAllProductCategories,
	fetchProductCategoryById,
} from "@/lib/products";

export const useProductsQuery = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["products"],
		queryFn: fetchAllProducts,
	});
	return { data, isLoading, error };
};

export const useProductByIdQuery = (id: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["product", id],
		queryFn: () => fetchProductById(id),
	});
};

export const useProductCategoriesQuery = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["productCategories"],
		queryFn: fetchAllProductCategories,
	});
	return { data, isLoading, error };
};

export const useProductCategoryByIdQuery = (id: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["productCategory", id],
		queryFn: () => fetchProductCategoryById(id),
	});
	return { data, isLoading, error };
};
