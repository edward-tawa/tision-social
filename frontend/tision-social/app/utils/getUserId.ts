import { cookies } from 'next/headers';
import { decodeToken } from "@/app/utils/decodeToken"

export const getUserId = async (): Promise<number | null> => {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('token')?.value;
    if (!cookieToken) return null;
    try {
        const userId = decodeToken(cookieToken);
        return userId ? Number(userId) : null;
    }
    catch {
        return null;
    }
}