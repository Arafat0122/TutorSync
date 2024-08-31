import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth;
    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    const NavLinks =
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/classes" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    All Classes
                </NavLink>
            </li>
            <li>
                <NavLink to="/teach" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    Teach on TutorSync
                </NavLink>
            </li>
        </>

    return (
        <div className="navbar bg-blue-200 font-cardo">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {NavLinks}
                    </ul>
                </div>
                <Link to={'/'}>
                    <img className="h-10" src="https://i.ibb.co/FzcBGnB/logo.png" alt="TutorSync" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className='menu menu-horizontal px-1 space-x-2 text-lg'>
                    {NavLinks}
                </ul>
            </div>
            <div className="navbar-end text-lg font-semibold">
                {
                    !user ?
                       ( <>
                            <div>
                                <Link to={'/login'}>
                                    <button><span className="hover:underline">Login</span> |</button>
                                </Link>
                            </div>
                            <div>
                                <Link to={'/register'}>
                                    <button>| <span className="hover:underline">Register</span></button>
                                </Link>
                            </div>
                        </>
                        ) :(
                        <>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="" src={user.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-blue-100 rounded-box w-40">
                                    <li className="font-semibold text-center">{user.displayName}</li>
                                    <li><Link  className="flex items-center justify-between" to={'/dashboard'}> Dashboard <MdDashboard/></Link></li>
                                    <li><button className="flex items-center justify-between" onClick={handleSignOut}>Log Out <MdOutlineLogout /></button></li>
                                </ul>
                            </div>
                        </>)
                }


            </div>
        </div>
    );
};

export default Navbar;