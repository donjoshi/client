import { createContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
export const UserContext = createContext({});


export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect( () => {
        if(!user)
        {
            const {data}= axios.get('/profile').then(({data})=>
            {
                setUser(data);
            });
            console.log("\nafter refrest",data);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user,setUser}}>
            {children}
        </UserContext.Provider>
        
        
    );
}