import { jwtDecode } from 'jwt-decode';

export const getUserId = (): number | null => {

    const cookiesArray: string[] = document.cookie.split(';');

    const tokenCookie: string = cookiesArray.find(cookie => cookie.trim().startsWith('token=')) || '';

    if (tokenCookie.length <= 1) return null;

    const tokenValue: string = tokenCookie.split('=')[1];

    try {
        const payload: { userId: number | string, sub: string } = jwtDecode(tokenValue);
        const userId = Number(payload.userId) ?? payload.sub;
        return userId ? Number(userId) : null;
    }
    catch {
        return null;
    }


}