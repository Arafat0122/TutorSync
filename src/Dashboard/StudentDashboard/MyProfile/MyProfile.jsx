import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import useTeacher from "../../../Hooks/useTeacher";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">My Profile</h1>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center">
                    <div className="avatar mb-4">
                        <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.photoURL} alt="User" />
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold mb-2">
                            <strong>Name:</strong> {user.displayName}
                        </p>
                        <p className="text-lg font-semibold mb-2">
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-lg font-semibold mb-2">
                            <strong>Role:</strong> {isAdmin ? 'Admin' : isTeacher ?  'Teacher' : 'Student'}
                        </p>
                        <p className="text-lg font-semibold mb-2">
                            <strong>Phone:</strong> {user.phone ? user.phone : '+8801725486215'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
