import { NextPage } from 'next'
import LayoutDone from 'src/layouts/LayoutDone'

interface Props {}

const DoneAll: NextPage<Props> = ({}) => {
  return <LayoutDone title='Thank you'>
    <div>
       <h1 className=' poppinsSemibold font-normal md:font-semibold text-ink-500 text-xl md:text-40px mx-auto md:w-full md:text-start'>It looks like you have completed this assessment.</h1>
    </div>
  </LayoutDone>
}

export default DoneAll