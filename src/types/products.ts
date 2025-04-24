export interface Product {
	id: string;
	seller_id: string;
	category_id: string;
	name: string;
	description: string;
	price: number;
	sale_price: number;
	stock_quantity: number;
	image_url: string;
	is_available: boolean;
	is_featured: boolean;
	is_active?: boolean;
	is_deleted?: boolean;
	review_count?: number;
	rating?: number;
	created_at?: string;
	updated_at?: string;
	category?: string;
	status?: "pending" | "approved" | "rejected" | "flagged";
	seller?: string;
	stock?: number;
}

export interface ProductCategory {
	id: string;
	name: string;
	slug: string;
	description: string;
	image_url: string;
	is_active?: boolean;
	is_deleted?: boolean;
	created_at?: string;
	updated_at?: string;
	parent_id: string | null;
	products_count: number;
}

export interface Category {
	id: string;
	name: string;
	slug: string;
	parent_id: string | null;
	products_count: number;
}
