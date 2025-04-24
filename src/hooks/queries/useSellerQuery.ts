import { useQuery } from "@tanstack/react-query";
import {
	fetchSellerVerification,
	fetchSellerDetails,
	fetchVerifiedSellers,
	fetchAllSellers,
	fetchSellersWithStatus,
} from "@/lib/sellers";
import { Seller } from "@/types/sellers";

export const useSellerQuery = () => {
	return useQuery<Seller[]>({
		queryKey: ["seller-verification"],
		queryFn: fetchSellerVerification,
	});
};

export const useSellerDetailsQuery = (id?: string) => {
	return useQuery<Seller>({
		queryKey: ["seller-details", id],
		queryFn: () => {
			if (!id) {
				throw new Error("Seller ID is required");
			}
			return fetchSellerDetails(id);
		},
		enabled: !!id,
	});
};

export const useVerifiedSellersQuery = () => {
	return useQuery<Seller[]>({
		queryKey: ["verified-sellers"],
		queryFn: fetchVerifiedSellers,
	});
};

export const useAllSellersQuery = () => {
	return useQuery<Seller[]>({
		queryKey: ["all-sellers"],
		queryFn: fetchAllSellers,
	});
};

export const useSellersWithStatusQuery = (status: string) => {
	return useQuery<Seller[]>({
		queryKey: ["sellers-by-status", status],
		queryFn: () => fetchSellersWithStatus(status),
		enabled: !!status && status !== "all",
	});
};
