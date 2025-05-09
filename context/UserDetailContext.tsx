import { createContext } from "react";

interface User {
    id: string;
    email: string;
    name?: string;
    picture?: string;
}

interface UserDetailContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User  | null>>;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(null);