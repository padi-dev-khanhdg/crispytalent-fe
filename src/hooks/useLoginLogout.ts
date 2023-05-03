import { useRouter } from "next/router"
import { useMutation } from "@tanstack/react-query"
import { useSetRecoilState } from "recoil"
import authApi from "src/api/authApi"
import { routerConstant } from "src/constants/routerConstant"
import { addCookie } from "src/utils/addCookie"
import { handleResultApi } from "src/utils/handleResultApi"
import { removeCookie } from "src/utils/removeCookie"
import { useLoading } from "./useLoading"
import { U_INFOR } from "src/constants/settingConstant"
interface IUser {
  email: string,
  password: string
}
export const useLogin = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation((data: IUser) => {
    return authApi.login(data)
  })
  useLoading(isLoading)
  const login = (info: IUser) => {
    mutate(info, {
      onSuccess: response => {
        addCookie(response.data.access_token)
        localStorage.setItem(U_INFOR,response.data.email)
        router.push(routerConstant.hr.createAssessments);
        handleResultApi(response);
      }
    })
  }
  return {
    login
  }
}
export const useLogout = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(() => {
    return authApi.logout()
  })
  const logout = () => {
    mutate(undefined, {
      onSuccess: response => {
        removeCookie();
        localStorage.removeItem(U_INFOR)
        router.push(routerConstant.hr.home);
        handleResultApi(response);
      }
    })
  }
  return {
    logout
  }
}