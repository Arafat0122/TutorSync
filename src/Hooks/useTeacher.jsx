import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useTeacher = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/teacher/${user.email}`);
            return res.data?.teacher;
        }
    });
    return [isTeacher, isTeacherLoading];
};

export default useTeacher;