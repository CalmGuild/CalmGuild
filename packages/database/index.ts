import { PrismaClient } from "@prisma/client";
import type { User as PrismaUser, RoleType as PrismaRoleType, ChannelType as PrismaChannelType } from "@prisma/client";
const database = new PrismaClient({ log: ["query", "info", "warn"] });

export default database;

export type User = PrismaUser;
export type RoleType = PrismaRoleType;
export type ChannelType = PrismaChannelType;
