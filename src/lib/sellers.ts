import { supabase } from "./supabase";
import { Seller } from "@/types/sellers";

export const fetchSellerVerification = async (): Promise<Seller[]> => {
	try {
		const { data, error } = await supabase
			.from("seller_verifications")
			.select("*")
			.eq("status", "pending");
		if (error) {
			console.error("Error fetching seller verification:", error);
			throw error;
		}
		return data || [];
	} catch (error) {
		console.error("Error fetching seller verification:", error);
		return [];
	}
};

export const fetchVerifiedSellers = async (): Promise<Seller[]> => {
	try {
		const { data, error } = await supabase
			.from("seller_verifications")
			.select("*")
			.eq("status", "verified");

		if (error) {
			console.error("Error fetching verified sellers:", error);
			throw error;
		}
		return data || [];
	} catch (error) {
		console.error("Error fetching verified sellers:", error);
		return [];
	}
};

export const fetchAllSellers = async (): Promise<Seller[]> => {
	try {
		const { data, error } = await supabase
			.from("seller_verifications")
			.select("*");

		if (error) {
			console.error("Error fetching all sellers:", error);
			throw error;
		}
		return data || [];
	} catch (error) {
		console.error("Error fetching all sellers:", error);
		return [];
	}
};

export const fetchSellersWithStatus = async (
	status: string,
): Promise<Seller[]> => {
	try {
		const { data, error } = await supabase
			.from("seller_verifications")
			.select("*")
			.eq("status", status);

		if (error) {
			console.error(`Error fetching ${status} sellers:`, error);
			throw error;
		}
		return data || [];
	} catch (error) {
		console.error(`Error fetching ${status} sellers:`, error);
		return [];
	}
};

export const fetchSellerDetails = async (id: string): Promise<Seller> => {
	try {
		const { data, error } = await supabase
			.from("seller_verifications")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			console.error("Error fetching seller details:", error);
			throw error;
		}

		return data;
	} catch (error) {
		console.error("Error fetching seller details:", error);
		throw new Error(`Failed to fetch seller with ID: ${id}`);
	}
};

export const updateSellerVerification = async (
	seller_id: string,
	status: string,
) => {
	try {
		const { data, error } = await supabase
			.from("seller_verifications")
			.update({
				status: status,
				verified_by: "Admin User",
				verification_date: new Date().toISOString(),
			})
			.eq("id", seller_id);

		if (error) {
			console.error("Error updating seller verification:", error);
			throw error;
		}
		return data;
	} catch (error) {
		console.error("Error updating seller verification:", error);
		throw error; // Re-throw the error so we can handle it in the component
	}
};

export const deleteSellerVerification = async (seller_id: string) => {
	try {
		const { data, error } = await supabase
			.from("seller_verifications")
			.delete()
			.eq("id", seller_id);

		if (error) {
			console.error("Error deleting seller:", error);
			throw error;
		}
		return data;
	} catch (error) {
		console.error("Error deleting seller:", error);
		throw error;
	}
};
