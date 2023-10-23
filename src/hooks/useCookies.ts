import { setCookie, destroyCookie, parseCookies } from 'nookies';

export const useCookies = () => {
    const saveCookie = (key: string, value: string) => {
        setCookie(undefined, key, value, {
            maxAge: (60 * 60) * 48, // 2 days
        });
    }


    const getCookie = (key: string) => {
        const cookies = parseCookies();

        return cookies[key];
    }

    const deleteCookies = (key: string) => {
        destroyCookie({}, key, {
            path: '/',
        });
    }


    return {
        saveCookie,
        getCookie,
        deleteCookies,
    }
}