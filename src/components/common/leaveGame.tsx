import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { routerConstant } from 'src/constants/routerConstant';
import { useModal } from 'src/hooks/useModal';

const LeaveGame = () => {
    const { closeModal } = useModal();
    const router =useRouter()
    const {game_id, sub_link }=router.query
    return (
        <div className='w-300px sm:w-400px md:w-480px'>
            <div className='flex items-center justify-between poppinsMedium text-base sm:text-xl '><h3 className='mb-0'>Are you sure you want to leave?</h3><button className='cursor-pointer' onClick={closeModal}><CloseIcon /></button></div>
            <div className='mt-50px mb-6 poppinsRegular text-ink-500'>If you leave the test, your current score will be recorded and you cannot continue or redo the test.</div>
            <div className='text-right'>
                <button className='py-2 px-4 bg-white-100 text-ink-500 poppinsMedium rounded-lg mr-4' onClick={closeModal}>Dismiss</button>
                <button className='py-2 px-4 bg-red-200 text-red-500 poppinsMedium rounded-lg' onClick={() => { closeModal();router.push(routerConstant.candidate.introGame(Number(game_id), sub_link as string)) }}>Leave test</button>
            </div>
        </div>
    )
}
export default LeaveGame