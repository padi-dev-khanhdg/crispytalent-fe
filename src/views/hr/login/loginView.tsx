import { NextComponentType } from 'next'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SubmitHandler, useForm } from 'react-hook-form';
import { regexEmail } from 'src/constants/regexConstant';
import { useLogin, useLogout } from 'src/hooks/useLoginLogout';
interface IFormData {
  email: string,
  password: string
}
const LoginView: NextComponentType = () => {
  const { login } = useLogin()
  const [showPass, setShowPass] = useState<boolean>(false);
  const { handleSubmit, register, formState: { errors } } = useForm<IFormData>({ mode: "onChange" });
  const handleShowPass = () => {
    setShowPass(!showPass)
  }

  const onSubmit: SubmitHandler<IFormData> = (payload) => {
    login(payload)
  };
  return (
    <div className='w-430px mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='poppinsSemibold text-40px mb-10 text-ink-500'>Welcome to <span className='text-primary-500'>crispytalent</span></h1>
        <div className="mb-7">
          <label className='block poppinsSemibold text-ink-500'>Email</label>
          <input className='w-full py-3 pr-3 pl-4 outline-none border border-white-100 rounded-lg poppinsRegular hover:border-primary-500 focus:border-primary-500 transition-all duration-300' {...register("email", { required: "Email is required!", pattern: regexEmail })} />
          <span className='poppinsRegular text-red-500'>{errors.email?.type === "required" ? errors.email.message : ""}</span>
          <span className='poppinsRegular text-red-500'>{errors.email?.type === "pattern" ? "Email is invalid!" : ""}</span>
        </div>
        <div className="mb-11">
          <label className='block poppinsSemibold text-ink-500'>Password</label>
          <div className='relative '>
            <input type={showPass ? "text" : "password"} className='w-full py-3 pl-4 pr-9 outline-none text-ink-400 poppinsRegular border border-white-100 rounded-lg overflow-hidden hover:border-primary-500 focus:border-primary-500 transition-all duration-300'{...register("password",{required:"Password is required!",minLength:6})} />
            <span className='absolute top-20% right-3% cursor-pointer' onClick={handleShowPass}>{showPass ? <VisibilityIcon className='text-slate-700 !w-5' /> : <VisibilityOffIcon className='text-slate-700 !w-5' />}</span>
          </div>
          <span className='poppinsRegular text-red-500'>{errors.password?.type === "required" ? errors.password.message : ""}</span>
          <span className='poppinsRegular text-red-500'>{errors.password?.type === "minLength" ? "Password at least 6 character!" : ""}</span>
        </div>
        <button disabled={errors.email||errors.password?true:false} className={` ${errors.email||errors.password?'bg-primary-100':'bg-primary-500 '} poppinsMedium w-full py-2.5 mb-7 rounded-lg text-white-500 `}>Log in</button>
        <p className='poppinsRegular text-lg text-end text-primary-500 underline decoration-current cursor-pointer'>Forgot password</p>
      </form>
    </div>
  )
}
export default LoginView
