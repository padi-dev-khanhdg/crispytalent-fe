import { NextPage } from 'next'
import HomeLayout from 'src/layouts/HomeLayout'
import HomeViews from 'src/views/candidate/Home/HomeViews'

interface Props { }

const Index: NextPage<Props> = ({ }) => {
    return <HomeLayout title='Home'>
        <HomeViews />
    </HomeLayout>
}

export default Index