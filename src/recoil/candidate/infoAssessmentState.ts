import { atom } from "recoil";
export interface IInfoAssessment{
    logo:string,
    company_name:string,
    start_date:string,
    end_date:string,
    setting:{
        show_point_net:boolean,
        show_success_only: boolean,
        show_filter_employee:boolean,
        email_invite_type:number,
        welcome_screen_type:number,
        introduction_screen_type:number,
        finish_assessment_screen_type:number

    }

}
export const infoAssessmentState = atom<IInfoAssessment>({
    key: 'info-assessment',
    default: {
        logo: "",
        company_name: "",
        start_date: "",
        end_date: "",
        setting: {
            show_point_net: false,
            show_filter_employee: true,
            show_success_only: true,
            email_invite_type: 1,
            welcome_screen_type: 1,
            introduction_screen_type: 1,
            finish_assessment_screen_type: 1
        }
    }
})