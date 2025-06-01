import { PrismaClient } from '@/lib/generated/prisma'

// this file is used to create a singleton instance of PrismaClient
// to prevent multiple instances in development mode
// and to ensure that the PrismaClient is reused across requests

// globalThis is used to store the PrismaClient instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a global variable to hold the PrismaClient instance
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

// If in development mode, assign the PrismaClient instance to the global variable
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
