import { atom } from 'recoil';
interface IHr {
    access_token: string,
    email: string | null,
}
export const userState = atom<IHr>({
    key: 'user',
    default: {access_token:"",email:""},
});
