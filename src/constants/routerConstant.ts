interface Router {
  [index: string]: any;
}

export const routerConstant: Router = {
  home: '/',
  login:"/login",
  hr:{
    home:'/hr',
    login: '/hr/login',
    createAssessments:'/hr/create-assessments',
    inviteAssNoId:"/hr/invite-assessments",
    inviteAssessments:(assessment_id:number)=>{return `/hr/invite-assessments/?id=${assessment_id}`},
    testLibrary:'/hr/test-library'
  },
  candidate:{
    home:'/candidate',
    mainAssessment: (sub_link: string)=>`/candidate/main-assessment?sub_link=${sub_link}`,
    introGameNoId:'/candidate/intro-game',
    introGame:(game_id:number,sub_link:string)=>`/candidate/intro-game/?game_id=${game_id}&sub_link=${sub_link}`,
    playGameNoId:'/candidate/play-game',
    playGame:(game_id:number,sub_link:string)=>`/candidate/play-game/?game_id=${game_id}&sub_link=${sub_link}`,
    done:'/candidate/done',
    doneAll:'/candidate/done-all'
  },
  signup: '/signup',
  page404: '/404',
  page500: '/500',
  profile: '/profile',
  seller: {
    home: '/seller',
    login: '/seller/login',
    group: '/seller/group',
    groupCreate: '/seller/group/create',
    groupEdit: '/seller/group/edit',
    member: '/seller/member',
    memberCreate: '/seller/member/create',
    memberEdit: '/seller/member/edit',
    series: '/seller/series',
    seriesCreate: '/seller/series/create',
    seriesEdit: '/seller/series/edit',
  },
};

export const routerPrivate: Array<string> = [routerConstant.profile,routerConstant.hr.createAssessments,routerConstant.hr.inviteAssNoId];
export const routerCandidatePrivate: Array<string> = [routerConstant.candidate.mainAssessment,routerConstant.candidate.introGameNoId,routerConstant.candidate.playGame]

export const isRouterPrivate = (pathName: string): boolean => {
  return routerPrivate.includes(pathName);
};
export const isRouterCandidatePrivate = (pathName: string): boolean => {
  return routerCandidatePrivate.includes(pathName);
};

export const isRouterSeller = (pathName: string): boolean => {
  const routerSeller = Object.values(routerConstant.seller);
  return routerSeller.includes(pathName);
};
