import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)

    }
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }
    const info = {googleLogin,setUser,user,loading,logOutUser}
    

    useEffect(() => {
        const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser?.email) {
                setUser(currentUser)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
        })
        return () => {
            unsubsCribe()
        }
    }, [])
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;