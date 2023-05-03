import { TOKEN, U_CANDIDATE } from 'src/constants/settingConstant';
import Cookies from 'universal-cookie';

export const addCookie = (jwt: string) => {
  const cookies = new Cookies();
  cookies.set(TOKEN, jwt, {
    path: '/'
  });
};
export const addCookieCandidate = (jwt: string) => {
  const cookies = new Cookies();
  cookies.set(U_CANDIDATE, jwt, {
    path: '/'
  });
};

