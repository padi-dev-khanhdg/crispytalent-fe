import { NextPage } from 'next'
import LayoutHrHome from 'src/layouts/hr/LayoutHrHome'
import CrateAssessmentsView from 'src/views/hr/createAssessments/createAssessmentsView'

interface Props {}

const CreateAssessments: NextPage<Props> = ({}) => {
  return <LayoutHrHome title='Create assessments'>
          <CrateAssessmentsView/>
  </LayoutHrHome>
}

export default CreateAssessments