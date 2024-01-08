import { FullUser } from "./FullUser";

export type UserContextType = {
    user: FullUser | null;
    loginUser: (userData: FullUser) => void;
    logoutUser: () => void;
};