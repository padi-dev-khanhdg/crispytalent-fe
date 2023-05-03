import { atom } from 'recoil';
export interface ICandidateGame {
    id: number,
    name: string,
    description: string,
    time: number,
    image_cover: string,
    score: number,
    status_text: string
    status:number
}
export const candidateListGameState = atom<Array<ICandidateGame>>({
    key: 'candidate-list-game',
    default: [],
});
export const gameCurrentState=atom<ICandidateGame>({
    key:'game-current',
    default:{ description: '', id: 0, image_cover: '', name: '', score: 0, time: 0, status_text: '',status:0}
})
