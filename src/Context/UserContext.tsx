import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {IUser} from "../types/IUser";

type UserContextType = {
    user: IUser | null;
    setUser: (value: IUser | null) => void;
};
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);


type Props = {
    children: ReactNode;
};

export const UserProvider = ({children}: Props) => {
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        checkAuth()
    },[])

    const checkAuth = () => {
        const localUserString = window.localStorage.getItem("current_user");
        console.log("currentUser", localUserString)
        if (localUserString != null && localUserString !== "null" && localUserString !== "undefined") {
            const localUser = JSON.parse(localUserString);
            setUser(localUser);
        } else {
            setUser(null);
        }
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);