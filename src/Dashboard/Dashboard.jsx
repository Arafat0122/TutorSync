import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';
import useClass from '../Hooks/useClass';
import useAdmin from '../Hooks/useAdmin';
import useTeacher from '../Hooks/useTeacher';
import { MdClass, MdOutlineLogout } from 'react-icons/md';
import useAuth from '../Hooks/useAuth';
import { FaChalkboardTeacher, FaHome, FaMoneyBill, FaUsers } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoMdAddCircleOutline } from 'react-icons/io';

const Dashboard = () => {

    const { enrollments } = useClass();
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();
    const { logOut } = useAuth();
    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }


    return (
        <div>
            <Helmet>
                <title>TutorSync | Student Dashboard</title>
            </Helmet>
            <div className="min-h-screen flex">
                <aside className="w-fit bg-blue-200 p-4">
                    <h2 className="hidden lg:flex text-2xl font-bold mb-6">Dashboard</h2>
                    <nav className='lg:text-lg lg:font-medium'>
                        <ul className="space-y-2 w-fit">
                            {
                                isAdmin ? <>
                                    <li>
                                        <Link to="teacher-requests" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><FaChalkboardTeacher /> <span className='hidden lg:flex'>Teacher Request</span></Link>
                                    </li>
                                    <li>
                                        <Link to="users" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><FaUsers /> <span className='hidden lg:flex'>Users</span></Link>
                                    </li>
                                    <li>
                                        <Link to="admin-allclasses" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><MdClass></MdClass> <span className='hidden lg:flex'> All Classes</span></Link>
                                    </li>
                                    <li>
                                        <Link to="profile" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><ImProfile></ImProfile>  <span className='hidden lg:flex'>Profile</span></Link>
                                    </li>
                                </>
                                    : isTeacher ? <>
                                        <li>
                                            <Link to="add-class" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><IoMdAddCircleOutline /> <span className='hidden lg:flex'> Add Class</span></Link>
                                        </li>
                                        <li>
                                            <Link to="my-classes" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><MdClass></MdClass> <span className='hidden lg:flex'> My Classes</span></Link>
                                        </li>
                                        <li>
                                            <Link to="profile" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><ImProfile></ImProfile> <span className='hidden lg:flex'>Profile</span></Link>
                                        </li>
                                    </>
                                        :
                                        <>
                                            <li>
                                                <Link to="myenrollclass" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><MdClass></MdClass> <span className='hidden lg:flex'>My Enroll Class</span>  <div className="badge hidden lg:flex">{enrollments.length}</div></Link>
                                            </li>
                                            <li>
                                                <Link to="my-payments" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"> <FaMoneyBill /> <span className='hidden lg:flex'>Payment History</span></Link>
                                            </li>
                                            <li>
                                                <Link to="profile" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><ImProfile></ImProfile><span className='hidden lg:flex'>Profile </span></Link>
                                            </li>
                                        </>
                            }
                        </ul>
                        <div className="divider w-fit lg:w-full"></div>
                        <ul className="space-y-2 w-fit">
                            <li>
                                <Link to="/" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><FaHome></FaHome> <span className='hidden lg:flex'>Home</span></Link>
                            </li>
                            <li>
                                <Link to="/classes" className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300"><MdClass></MdClass> <span className='hidden lg:flex'>Classes</span></Link>
                            </li>
                            <li>
                                <Link className="flex items-center gap-2 py-2 px-4 bg-blue-100 rounded hover:bg-blue-300" onClick={handleSignOut}><MdOutlineLogout /> <span className='hidden lg:flex'>Log Out</span></Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-8 bg-blue-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;