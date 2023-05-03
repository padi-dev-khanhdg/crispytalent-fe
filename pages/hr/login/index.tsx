import { NextPage } from 'next'
import LayoutLogin from 'src/layouts/hr/LayoutLogin'
import LoginView from 'src/views/hr/login/loginView'

interface Props {}

const Login: NextPage<Props> = ({}) => {
  return <LayoutLogin title='login'>
        <LoginView/>
  </LayoutLogin>
}

export default Login