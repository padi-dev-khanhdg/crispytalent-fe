import { NextPage } from 'next'
import LayoutHrHome from 'src/layouts/hr/LayoutHrHome'
import InviteAssessmentsView from 'src/views/hr/inviteAssessments/inviteAssessmentsView'

interface Props {}

const InviteAssessments: NextPage<Props> = ({}) => {
  return <LayoutHrHome title='Invite-Assessments'>
        <InviteAssessmentsView/>
  </LayoutHrHome>
}

export default InviteAssessments