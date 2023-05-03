import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './src/utils/verifyJwt';
import { isRouterCandidatePrivate, isRouterPrivate, isRouterSeller, routerConstant } from './src/constants/routerConstant';
import { TOKEN, U_CANDIDATE } from 'src/constants/settingConstant';


export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const jwt = request.cookies.get(TOKEN)
  const tokenCandidate=request.cookies.get(U_CANDIDATE)
  if (isRouterPrivate(pathName) && !verifyJwt(jwt)) {
  
      return NextResponse.redirect(new URL(routerConstant.hr.login, request.url));
  }
  if (isRouterCandidatePrivate(pathName) && tokenCandidate===undefined) {
    return NextResponse.redirect(new URL(routerConstant.candidate.home, request.url));
}
  if(pathName===routerConstant.home){
    return NextResponse.redirect(new URL(routerConstant.hr.home, request.url))
  }
  // if (isRouterSeller(pathName) && !isSeller(role)) {
  //   return NextResponse.redirect(new URL(routerConstant.page404, request.url));
  // }

  return NextResponse.next();
}
