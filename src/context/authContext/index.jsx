import React , { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {createUserProfile} from '../../firebase/userProfile'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
} 
export function AuthProvider({children})  {

    const [currentUser , setCurrentUser] = useState(null);
    const [loggedIn , setLoggedIn] = useState(false);
    const [loading , setLoading] = useState(true);
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await user.reload(); 
                setEmailVerified(user.emailVerified);
                if (user.emailVerified) {
                    await initializeUser(user);
                } else {
                    setCurrentUser(null);
                    setLoggedIn(false);
                }
            } else {
                setCurrentUser(null);
                setLoggedIn(false);
            }

            setLoading(false);
        });


        const interval = setInterval(async () => {
            const user = auth.currentUser;
            if (user && !emailVerified) {
                await user.reload();
                if (user.emailVerified) {
                    setEmailVerified(true);
                    await initializeUser(user);
                }
            }
        }, 3000);

        return () => {
            unsubscribe();
            clearInterval(interval);
        };
    }, [emailVerified]);

    async function initializeUser(user) {
        
        if(user && user.emailVerified)
        {
            await createUserProfile(user);
            setCurrentUser({...user});
            setLoggedIn(true);
        }
        else {
            setCurrentUser(null);
            setLoggedIn(false);
        }

        setLoading(false);
    }

    const value = {
        currentUser,
        loggedIn,
        loading
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
