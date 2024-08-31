import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: enrollments = [], isLoading, error } = useQuery({
        queryKey: ['enrollments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollments?email=${user.email}`);
            return res.data;
        },
        retry: false, // Avoid retrying on failure
    });

    return { enrollments, isLoading, error };
};

export default useClass;
