import { atom } from "recoil";

export const checkEmailAssessmentState = atom<Array<string>>({
    key: 'check-email-assessment',
    default: []
})
export const resetFieldListEmail = atom<boolean>({
    key: 'reset-field-list-email',
    default: false
})