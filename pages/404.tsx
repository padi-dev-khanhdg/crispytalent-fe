import { NextPage } from 'next'
import HomeLayout from 'src/layouts/HomeLayout'
import PageNotFound from 'src/views/404/404View'

interface Props {}

const Page404: NextPage<Props> = ({}) => {
  return <div className='h-screen'>
    <HomeLayout title='404'>
          <PageNotFound/>
    </HomeLayout>
  </div>
}

export default Page404