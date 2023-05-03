import { removeCookie } from './removeCookie';
import { ToastError, ToastSuccess } from '../components/common/toast';

export const handleResultApi = (response: any) => {
  if (response.status && response.code == 401) {
    removeCookie();
  }
  if (response.code===200) {
    return ToastSuccess(response.message);
  } else {
    return ToastError(response.message);
  }
  

};
