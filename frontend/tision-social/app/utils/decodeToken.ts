import { jwtDecode } from 'jwt-decode';



export const decodeToken = (token: string): number | null => {
    try {
        const payload: { userId: number, sub: string } = jwtDecode(token);
        const userId = Number(payload.userId) || payload.sub;
        return userId ? Number(userId) : null;
    }
    catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}