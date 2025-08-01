import { PublicUser } from "@/app/data/user/userSlice";

export const mockUsers: PublicUser[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    firstname: `User${i + 1}`,
    lastname: `Test${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
}));