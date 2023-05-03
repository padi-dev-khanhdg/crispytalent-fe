import { NextPage } from 'next'
import LayoutPlayGame from 'src/layouts/LayoutGame'
import IntroductionGame from 'src/views/candidate/IntroductionGame/IntroductionGame'

interface Props {}

const IntroGame: NextPage<Props> = ({}) => {
  return <IntroductionGame/>

}

export default IntroGame