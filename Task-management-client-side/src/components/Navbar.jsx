import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { logOutUser, user } = useContext(AuthContext)

    const handelLogOut = () => {
        logOutUser()
    }
    return (
        <section className="bg-gradient-to-r from-purple-200  to-blue-200 sticky top-0">
            <div className="navbar w-full max-w-7xl md:px-10  mx-auto ">
                <div className="navbar-start lg:w-1/2 w-full">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            
                            <li><button onClick={handelLogOut} className="hover:text-green-500 md:text-xl">Log Out</button></li>
                        </ul>
                    </div>
                    <Link to={'/'} className="hover:text-green-500 text-lg   md:text-3xl">Task Management</Link>
                </div>
               
                <div className="navbar-end gap-2">
                    <div className="md:w-10 w-8 h-8 md:h-10 rounded-full border overflow-hidden">
                        <img className="w-full" src={user.photoURL} referrerPolicy="no-referrer" alt="" />
                    </div>
                    <button onClick={handelLogOut} className="hover:text-green-500 md:text-xl hidden md:block">Log Out</button>
                </div>
            </div>
        </section>
    );
};

export default Navbar;