import { atom } from "recoil";
export interface IGenerateQuestion{
    answered_question_num: number,
    game_ended: boolean,
    option: null,
    question: {id: number, game_id: number, content:any, score: number},
    time: number,
    total_question: number,
    total_score: number,
    used_time: number
}
export const generateQuestionState=atom<IGenerateQuestion>({
    key:'generate-question',
    default:{
        answered_question_num: 0,
        game_ended: false,
        option: null,
        question: {id: 0, game_id: 0, content:"", score: 0},
        time: 10,
        total_question: 0,
        total_score: 0,
        used_time: 0
    }
})