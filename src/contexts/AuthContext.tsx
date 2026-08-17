import React, { createContext, useContext, useEffect, useState } from "react";
import {refresh} from "@/services/auth.service";
import { setAccessToken as setToken } from "@/services/token.service"

interface AuthContextData {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const setAccessToken = (token: string | null) => {
        setAccessTokenState(token);
        setToken(token);
    };

    useEffect(() => {
        async function restoreSession() {
            try {
                const response = await refresh();

                setAccessToken(response.access);
            } catch {
                setAccessToken(null);
            } finally {
                setIsLoading(false);
            }
        }

        restoreSession();
    }, []);


    return (
        <AuthContext.Provider
        value={{
            accessToken,
            setAccessToken,
            isLoading,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser utilizado dentro de AuthProvider");
    }

    return context;
}
