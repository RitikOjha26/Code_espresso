import React, { Children, useEffect, useState } from "react";
import { getUserProfile } from "../../firebase/userProfile";
import { useAuth } from "../authContext";

const userContext = React.createContext();

export function AuthProvider({ children }) {
    const currentUser = useAuth();
    const [userData, setUserData] = useState({});

    useEffect((() => {
        const fetchUserData = async () => {

            if (currentUser?.uid) {
                const data = getUserProfile(currentUser);
                setUserData(data);
            }

        };

        fetchUserData();


    }), [currentUser, userData]);

    const updateUserData = async({e}) =>{

        if(currentUser?.uid){
            const data = getUserProfile(currentUser);
            setUserData(currentUser, {...data , e});

        }
    }

}
