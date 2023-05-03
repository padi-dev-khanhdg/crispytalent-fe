import { atom } from "recoil";

export const checkCorrectState=atom<boolean>({
    key:'check-correct',
    default:false
})
export const checkWrongState=atom<boolean>({
    key:'check-wrong',
    default:false
})