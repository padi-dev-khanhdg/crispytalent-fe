import { TOKEN, U_CANDIDATE } from 'src/constants/settingConstant';
import Cookies from 'universal-cookie';

export const removeCookie = () => {
  const cookies = new Cookies();
  cookies.remove(TOKEN,{path:'/'});
  localStorage.removeItem(TOKEN);
};
export const removeCookieCandidate = () => {
  const cookies = new Cookies();
  cookies.remove(U_CANDIDATE,{path:'/'});
  localStorage.removeItem(TOKEN);
};
