import { supabase } from "./supabase";
import { Product, ProductCategory } from "@/types/products";

export const fetchAllProducts = async (): Promise<Product[]> => {
	try {
		const { data, error } = await supabase.from("products").select("*");
		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
};

export const fetchProductById = async (id: string): Promise<Product> => {
	try {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("id", id);
		if (error) throw error;
		return data[0];
	} catch (error) {
		console.error("Error fetching product by id:", error);
		return null;
	}
};

export const fetchAllProductCategories = async (): Promise<
	ProductCategory[]
> => {
	try {
		const { data, error } = await supabase.from("categories").select("*");
		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error fetching product categories:", error);
		return [];
	}
};

export const fetchProductCategoryById = async (
	id: string,
): Promise<ProductCategory> => {
	try {
		const { data, error } = await supabase
			.from("categories")
			.select("*")
			.eq("id", id);
		if (error) throw error;
		return data[0];
	} catch (error) {
		console.error("Error fetching product category by id:", error);
		return null;
	}
};

export const createProductCategory = async (
	category: ProductCategory,
): Promise<ProductCategory> => {
	try {
		const { data, error } = await supabase
			.from("categories")
			.insert(category)
			.select()
			.single();
		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error creating product category:", error);
		return null;
	}
};

export const updateProductCategory = async (
	category: ProductCategory,
): Promise<ProductCategory> => {
	try {
		const { data, error } = await supabase
			.from("categories")
			.update(category)
			.eq("id", category.id)
			.select()
			.single();
		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error updating product category:", error);
		return null;
	}
};

export const deleteProductCategory = async (id: string): Promise<void> => {
	try {
		const { error } = await supabase.from("categories").delete().eq("id", id);
		if (error) throw error;
	} catch (error) {
		console.error("Error deleting product category:", error);
	}
};
