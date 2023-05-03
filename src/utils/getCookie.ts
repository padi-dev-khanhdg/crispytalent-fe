import Cookies from 'universal-cookie';
export const getCookie = (name: string) => {
    const cookies = new Cookies();
    return cookies.get(name)
};
