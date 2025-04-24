import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface UserData {
	user: User | null;
	profile: Profile | null;
}

export const useUserQuery = () => {
	return useQuery<UserData | null>({
		queryKey: ["user"],
		queryFn: async () => {
			// First check if we have a session
			const { session, error: sessionError } = await getSession();

			if (sessionError || !session) {
				console.log("No active session found");
				return null;
			}

			// If we have a session, get the user
			const { user, error } = await getCurrentUser();

			if (error || !user) {
				console.log("No user found despite having a session");
				return null;
			}

			// Get user profile
			const { data: profile, error: profileError } = await supabase
				.from("profiles")
				.select("*")
				.eq("id", user.id)
				.single();

			if (profileError) {
				console.error("Error fetching profile:", profileError);
				return { user, profile: null };
			}

			return { user, profile };
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
		refetchOnWindowFocus: true,
	});
};
