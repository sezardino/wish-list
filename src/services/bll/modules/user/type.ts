import { Prisma } from "@prisma/client";

export type UserWithList = Prisma.UserGetPayload<{ include: { lists: true } }>;
export type UserWithListAndWithoutPassword = Omit<UserWithList, "password">;
