import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { mockUser } from "./userMock";

// Tipagem mais específica do usuário
interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

// Tipagem do contexto
interface UserContextType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

// Criando o contexto
const UserContext = createContext<UserContextType | null>(null);

// Componente Provider
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>(mockUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar o contexto
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser deve ser usado dentro de <UserProvider>");
    }
    return context;
};