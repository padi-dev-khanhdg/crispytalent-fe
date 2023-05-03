import { atom } from 'recoil';
export interface IAssessments {
    candidates_count: number,
    created_at: string | null,
    deleted_at: string | null,
    end_date: string,
    id: number,
    job_function: string,
    job_position: string,
    name: string,
    start_date: string,
    status: number,
    sub_link: string,
    updated_at: string,
    user_id: number
}
export const listAssessmentsActiveState = atom<Array<IAssessments>>({
    key: 'list-assessment-active',
    default: [],
});
export const listAssessmentsArchiveState = atom<Array<IAssessments>>({
    key: 'list-assessment-archive',
    default: [],
});
