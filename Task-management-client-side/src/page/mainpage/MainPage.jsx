import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const MainPage = () => {
    const { user } = useContext(AuthContext)
    if (!user) {
        return <Navigate to={'/login'}></Navigate >
    }
return (
    <div>

    </div>
);
};

export default MainPage;