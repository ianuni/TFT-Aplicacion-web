import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if(user){
                const token = await user.getIdToken();
                setCurrentUser({...user, token: token});
            }
            else{
                setCurrentUser(user);
            }
            setLoading(false);
        });
        return unsub;
    }, []);

    return(
        <AuthContext.Provider value={{currentUser, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}