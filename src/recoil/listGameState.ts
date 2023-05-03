import { atom } from 'recoil';
export interface IGame 
{
    id: number,
    name: string,
    description: string,
    time: number,
    image_cover: string,
    score: number,
    updated_at: string | null,
    created_at: string | null,
}
export const listGameState = atom<Array<IGame>>({
    key: 'list-game',
    default: [],
});
