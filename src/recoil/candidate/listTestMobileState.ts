import { atom } from "recoil";

export const listTestMobileState=atom<boolean>({
    key:'list-test-mobile',
    default:false
})