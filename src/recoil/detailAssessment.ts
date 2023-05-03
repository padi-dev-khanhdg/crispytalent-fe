"assessment"
import { atom } from "recoil"
import { IAssessments } from "./listAssessments"
import { IGame } from "./listGameState"
interface IDetail_Assessment extends IAssessments {
    games: Array<IDetail_Game>
}
interface IDetail_Game extends IGame {
    pivot: {
        assessment_id: number,
        game_id: number
    }
}
interface IDetail {
    assessment: IDetail_Assessment
    number_played: number
    number_invited: number
}

export const detailAssessmentState = atom<IDetail>({
    key: "detail_assessment",
    default: {
        assessment: {
            id: 0,
            user_id: 0,
            job_function: "",
            job_position: "",
            name: "",
            status: 0,
            start_date: "",
            end_date: "",
            sub_link: "",
            created_at: "",
            updated_at: "",
            candidates_count: 0,
            deleted_at: null,
            games: [{
                id: 9,
                name: "",
                description: "",
                time: 0,
                option: null,
                image_cover: "",
                created_at: null,
                updated_at: null,
                end_date: null,
                pivot: {
                    assessment_id: 0,
                    game_id: 0
                }
            }]
        },
        number_invited: 0,
        number_played: 0
    }
})