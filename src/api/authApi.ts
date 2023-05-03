
import apiClient from './apiClient';

export interface ParamsLogin {
  email: string;
  password: string;
}

export interface ParamsSignup {
  id: number;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: number;
}

export interface ParamsLogout {
  email: string;
}
export interface ParamsDeleteAssessment {
  assessment_id: number;
}
export interface ParamsArchiveAssessment extends ParamsDeleteAssessment{
  
}
export interface ParamsDuplicateAssessment extends ParamsDeleteAssessment {
  
}
export interface ParamInviteCandidate{
  list_email:Array<string>,
  assessment_id:number,
  type:number
}
export interface ParamCheckEmailCandidate extends ParamInviteCandidate{

}
export interface ParamCandidateLogin{
  email:string
}
export interface ParamInfoAssessment{
  sub_link :string
}
export interface ParamGameInfo{
  game_id:number
  sub_link:string
}
export interface ParamAnswerQuestion{
  question_id:number,
  answer:string,
  game_id:number,
  is_skip:number
}

const authApi = {
  login(userInfo: ParamsLogin) {
    const url = '/auth/login';
    return apiClient.post(url, userInfo);
  },
  signup(params: ParamsSignup) {
    const url = '/auth/signup';
    return apiClient.post(url, params);
  },
  logout() {
    const url = '/auth/logout';
    return apiClient.post(url);
  },
  fetchListAssessments(status: number) {
    const url = `/assessments/list?status=${status}`
    return apiClient.get(url)
  },
  fetchListGame() {
    const url = "/tests/all"
    return apiClient.get(url)
  },
  createAssessment(params: any) {
    const url = "/assessments/create"
    return apiClient.post(url, params)
  },
  deleteAssessment(assessmentInfo: ParamsDeleteAssessment) {
    const url = "/delete-assessment";
    return apiClient.post(url, assessmentInfo)
  },
  archiveAssessment(assessmentInfo: ParamsArchiveAssessment) {
    const url = "/archive-assessment";
    return apiClient.post(url, assessmentInfo)
  },
  unArchiveAssessment(assessmentInfo: ParamsArchiveAssessment) {
    const url = "/unarchive-assessment";
    return apiClient.post(url, assessmentInfo)
  },
  fetchDetailAssessment(assessmentID: number|string){
    const url = `/assessments/${assessmentID}`;
    return apiClient.get(url)
  },
  duplicateAssessment(assessmentInfo:ParamsDuplicateAssessment){
    const url = "/copy-assessment";
    return apiClient.post(url,assessmentInfo)
  },
  inviteCandidate(data:ParamInviteCandidate){
    const url='/invited/inviteCandidate';
    return apiClient.post(url,data)
  },
  checkEmailCandidate(data:ParamCheckEmailCandidate){
    const url="/invited/check-email"
    return apiClient.post(url,data)
  },
  candidateLogin(sub_link:any,candidateInfo:ParamCandidateLogin){
    const url=`/assessments/candidate-login?sub_link=${sub_link}`
    return apiClient.post(url,candidateInfo)
  },
  candidateListGame(sub_link: string){
    const url=`/assessments/candidate/${sub_link}`;
    return apiClient.get(url)
  },
  infoAssessment(data:ParamInfoAssessment){
    const url='/assessments/get-info-assessment'
    return apiClient.post(url,data)
  },
  fetchGenerateQuestion(sub_link: string, test_id: string){
    const url=`/assessments/candidate/${sub_link}/${test_id}`
    return apiClient.get(url)
  },
  answerQuestion(data:ParamAnswerQuestion, sub_link: string, test_id: string){
    const url=`/assessments/candidate/${sub_link}/${test_id}/answer`
    return apiClient.post(url,data)
  },
  finishGame(data:ParamGameInfo){
    const url='/assessments/candidate/finish-game'
    return apiClient.post(url,data)
  }
};

export default authApi;
