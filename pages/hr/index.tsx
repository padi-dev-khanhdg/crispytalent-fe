import { NextPage } from 'next'
import LayoutHrHome from 'src/layouts/hr/LayoutHrHome'
import HrHomeView from 'src/views/hr/home/homeView'

interface Props { }

const Home: NextPage<Props> = ({ }) => {
  return <LayoutHrHome title='Hr Home'>
      <HrHomeView />
    </LayoutHrHome>
 
}

export default Home
