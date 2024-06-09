import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCheckouts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const contact_email = user?.email || ""; // Get the user's email from authentication

    const { refetch, data: checkouts = [] } = useQuery({
        queryKey: ['checkouts', contact_email],
        queryFn: async () => {
            if (!contact_email) {
                // No email available, return empty array
                return [];
            }
            const res = await axiosSecure.get(`/checkouts?email=${contact_email}`);
            return res.data;
        }
    });

    return [checkouts, refetch];
};

export default useCheckouts;
