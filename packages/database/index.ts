import { PrismaClient } from "@prisma/client";
import type { User as PrismaUser } from "@prisma/client";
const database = new PrismaClient({ log: ["query", "info", "warn"] });

export default database;
export type User = PrismaUser;
