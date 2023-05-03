import CloseIcon from '@mui/icons-material/Close';
import { useModal } from 'src/hooks/useModal';
interface IDelete{
    title:string,
    content:string,
    callbackFunction:any
}
export const DeleteView = ({title,content,callbackFunction}:IDelete) => {
    const { closeModal } = useModal();
  
    return (
        <div className='w-480px'>
            <div className='flex items-center justify-between poppinsMedium text-xl '><h3 className='mb-0'>{title}</h3><button className='cursor-pointer' onClick={closeModal}><CloseIcon /></button></div>
            <div className='mt-50px mb-6 poppinsRegular text-ink-500'>{content}</div>
            <div className='text-right'>
                <button className='py-2 px-4 bg-white-100 text-ink-500 poppinsMedium rounded-lg mr-4' onClick={closeModal}>Cancel</button>
                <button className='py-2 px-4 bg-red-200 text-red-500 poppinsMedium rounded-lg' onClick={()=>{callbackFunction();closeModal()}}>Delete</button>
            </div>
        </div>
    )
}