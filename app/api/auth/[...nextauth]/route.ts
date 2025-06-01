import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import NextAuth from "next-auth"

// This file handles the NextAuth API routes for authentication.
const handler = NextAuth(NEXT_AUTH_CONFIG)

export { handler as GET, handler as POST }