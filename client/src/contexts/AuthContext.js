import { createContext, useState, useEffect } from 'react';

//declare the context
const AuthContext = createContext({});

//provides the information we store in the context to the children.
function AuthProvider({children}){
    const loginSession = JSON.parse(sessionStorage.getItem("login")) || {
        username:"",
        loggedIn:false
    };

    //global state
    const [loggedIn, setLoggedIn] = useState(loginSession["loggedIn"]);
    const [username, setUsername] = useState(loginSession["username"]);

    useEffect(() => {
    sessionStorage.setItem("login", JSON.stringify({username:username, loggedIn:loggedIn}))
    }, [username, loggedIn])

    //function defined to handle the login
    const handleLogin = (isLoggedIn, username) => {
        //set the loggedin to the first parameter of our function
        setLoggedIn(isLoggedIn);
        isLoggedIn ? setUsername(username) : setUsername("");
    }

    return (
         <AuthContext.Provider value={{loggedIn, username, handleLogin}}>
            {children}
         </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}