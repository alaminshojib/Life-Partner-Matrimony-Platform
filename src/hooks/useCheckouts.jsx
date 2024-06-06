// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCheckouts = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: checkouts = [] } = useQuery({
        queryKey: ['checkouts', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/checkouts?email=${user.email}`);
            return res.data;
        }
    })

    return [checkouts, refetch]
};

export default useCheckouts;