import { atom } from "recoil";
interface IScore{
    status:boolean,
    score:number
}
export const ScoreState=atom<IScore>({
    key:'score',
    default:{status:false,score:0}
})