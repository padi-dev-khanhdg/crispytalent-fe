import { NextPage } from 'next'
import LayoutDone from 'src/layouts/LayoutDone'

interface Props {}

const Done: NextPage<Props> = ({}) => {
  return <LayoutDone title='Thank you'>
    <div>
       <h1 className='poppinsSemibold text-ink-500 text-40px text-center md:text-start mb-10'>Thank you</h1>
       <p className='mb-7 poppinsMedium text-ink-500 text-center md:text-start  md:text-xl pr-40'>{"You have completed this assessment.Thank you & hope you had fun!"}</p>
       <p className=' poppinsMedium text-ink-500 text-center md:text-start  md:text-xl'>You can close the assessment window now.</p>
    </div>
  </LayoutDone>
}

export default Done