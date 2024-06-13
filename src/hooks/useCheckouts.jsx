import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCheckouts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: checkouts = [], refetch } = useQuery({
        queryKey: ['checkouts'],
        queryFn: async () => {
          const response = await axiosSecure.get('/checkouts');
    
          const { data: payments = [] } = await axiosSecure.get('/payments');
    
          // Filter payments data where email matches user.email
          const filteredPayments = payments.filter(payment => payment.email === user.email);
    
          // Extract biodataIds from filtered payments
          const filteredBiodataIds = filteredPayments.map(payment => payment.items.map(item => item.biodataId)).flat();
    
          // Filter checkouts data where the combination of user.email and biodataId is not present in the filtered payments data
          const filteredCheckouts = response.data.filter(checkout => !filteredBiodataIds.includes(checkout.biodataId));
    
          return filteredCheckouts.map(item => ({
            ...item,
            price: item.price || 5, // Set default price to $5 if price is not provided
          }));
        },
      });

    return [checkouts, refetch];
};

export default useCheckouts;
