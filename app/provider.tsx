"use client";
import { SessionProvider } from "next-auth/react";

export const Provider = ({ children }: any) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
