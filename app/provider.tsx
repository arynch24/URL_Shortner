"use client";
import { SessionProvider } from "next-auth/react";

export const Provider = ({ children }: any) => {
    // This component wraps the application with the NextAuth session provider
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
