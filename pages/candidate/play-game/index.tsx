import { NextPage } from 'next'
import LayoutPlayGame from 'src/layouts/LayoutGame'
import ScreenPlayGame from 'src/views/candidate/PlayGame/ScreenPlayGame'

interface Props {}

const PlayGame: NextPage<Props> = ({}) => {
  return <LayoutPlayGame title='Play Game'>
        <ScreenPlayGame/>
  </LayoutPlayGame>
}

export default PlayGame