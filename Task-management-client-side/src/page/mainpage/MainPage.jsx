import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";

const MainPage = () => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (!user) {
        return <Navigate to={'/login'}></Navigate >
    }
    return (
        <div>
            <Navbar></Navbar>
        </div>
    );
};

export default MainPage;