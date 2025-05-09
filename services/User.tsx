import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";

const useUser = () => {
    const context = useContext(UserDetailContext);
    if (!context) {
        throw new Error("useUser must be used within a UserDetailProvider");
    }
    const { user } = context;
    return user
};

export { useUser };