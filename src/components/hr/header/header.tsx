import { NextComponentType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { isRouterCandidatePrivate, routerConstant } from 'src/constants/routerConstant'
import logo from '../../../assets/image/logo.png'
import avatar from '../../../assets/image/avatar.png'
import { truncate } from 'src/utils/truncate'
import { Dropdown } from 'antd'
import { useLogout } from 'src/hooks/useLoginLogout'
import { getCookie } from 'src/utils/getCookie'
import { TOKEN, U_INFOR } from 'src/constants/settingConstant'
import Cookies from 'universal-cookie'
interface IProps {
}
type MiddleNav = React.ReactElement
type EndNav = React.ReactElement
const Header: NextComponentType = ({ }) => {
  const {logout} =useLogout()
  const cookies=new Cookies()
  const router = useRouter();
  const { candidate,hr, home, page404 } = routerConstant;
  const menu = (
      <div className=' w-200px bg-white-500 shadow-lg rounded-lg overflow-hidden border border-white-100'>
          <button className='w-full py-2 poppinsMedium text-ink-500  hover:bg-primary-500 hover:text-white-500 transition-all duration-300' onClick={()=>{router.push(routerConstant.hr.createAssessments)}}>Create assessment</button>
          <button className='w-full py-2 poppinsMedium text-ink-500  hover:bg-primary-500 hover:text-white-500 transition-all duration-300' onClick={logout}>Logout</button>
      </div>
  );
  const menuCandi= (
    <div className=' w-200px bg-white-500 shadow-lg rounded-lg overflow-hidden border border-white-100'>
        <button className='w-full py-2 poppinsMedium text-ink-500  hover:bg-primary-500 hover:text-white-500 transition-all duration-300' onClick={()=>{cookies.remove('u_candi');cookies.remove('name_candidate')}}>Logout</button>
    </div>
);
  const path = router.pathname;
  const classFocus='relative pb-1 cursor-pointer poppinsMedium text-xl text-primary-500 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-primary-500 after:left-0 after:bottom-0 '
  const classInitial='relative pb-1 cursor-pointer poppinsMedium text-xl text-ink-500 hover:text-primary-500 transition-text duration-300 after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-primary-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-w after:duration-300'
  let middleNav: MiddleNav = <></>;
  const onClickLogin = () => {
    router.push(hr.login)
  }
  let endNav: EndNav = <></>
  const onClickLogo = () => {
    if (router.asPath.indexOf("hr/") !== -1) {
      router.push(hr.home)
    } else {
      router.push(candidate.home)
    }
  }
  if (path === hr.createAssessments || path===hr.testLibrary) {
    middleNav = <ul className='flex items-center gap-20'>
      <li className={path===hr.createAssessments?classFocus:classInitial}><span >My assessments</span></li>
      <li className={path===hr.testLibrary?classFocus:classInitial}>Test library</li>
    </ul>
  }
  if (path === hr.inviteAssessments ) {
    middleNav = <ul className='flex items-center gap-20'>
      <li className={path===hr.inviteAssessments?classFocus:classInitial}><span >Invite assessments</span></li>
      <li className={path===hr.testLibrary?classFocus:classInitial}>Label</li>
    </ul>
  }
  if (getCookie(TOKEN) || getCookie('u_candi') ) {
    if(!router.pathname.includes('candidate')){
      endNav = <Dropdown overlay={menu}>
      <div >
        <div className='flex items-center gap-2 cursor-pointer'>
      <div className='poppinsMedium text-xl text-primary-500'>{truncate(localStorage.getItem(U_INFOR))}</div>
      <div><Image src={avatar} width={60} height={60} alt="avatar" /></div>
      </div>
    </div>
     </Dropdown>
    }else{
      endNav = <Dropdown overlay={menuCandi}>
      <div >
        <div className='flex items-center gap-2 cursor-pointer'>
      <div className='poppinsMedium text-xl text-primary-500'>{truncate(cookies.get('name_candidate'))}</div>
      <div><Image src={avatar} width={60} height={60} alt="avatar" /></div>
      </div>
    </div>
     </Dropdown>
    }

  } else  {
    endNav = <div>
      <button className='bg-primary-100 text-primary-500 poppinsMedium py-2.5 px-46px rounded-lg mr-10'>Test library</button>
      <button className='bg-primary-500 text-white-500 poppinsMedium py-2.5 px-66px rounded-lg' onClick={onClickLogin}>Log in</button>
    </div>
  }
  if (path === home|| path===candidate.home || path===candidate.done|| path===candidate.doneAll|| isRouterCandidatePrivate(path) || path === hr.login || path === page404) {
    return (
      <header className='hidden md:block'>
        <nav className='mt-10 mx-10'>
          <span className='cursor-pointer' onClick={onClickLogo}><Image src={logo} width={250} height={100} alt="logo" /></span>
        </nav>
      </header>
    )
  }

  return (
    <header>
      <nav className='mt-10 mx-10 flex items-center justify-between'>
        <div className='cursor-pointer' onClick={onClickLogo}><Image src={logo} width={250} height={100} alt="logo" /></div>
        {middleNav}
        {endNav}
      </nav>
    </header>
  )
}
export default Header