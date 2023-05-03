import { NextPage } from 'next'
import HomeLayout from 'src/layouts/HomeLayout'
import MainAssessments from 'src/views/candidate/MainAssessments/MainAssessments'

interface Props {}

const MainAssessment: NextPage<Props> = ({}) => {
  return <HomeLayout title='main-assessments'>
    <MainAssessments/>
  </HomeLayout>
}

export default MainAssessment