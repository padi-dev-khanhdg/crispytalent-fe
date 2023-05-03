import { Slide, toast } from 'react-toastify';

export const ToastSuccess = (message?: string, time?: number) => {
  toast['success'](<span className='poppinsMedium'>{message}</span> || 'success', {
    position: 'top-right',
    autoClose: time || 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition:Slide
  });
};

export const ToastCompleteTest = (message?: string, time?: number) => {
  toast['warning'](<span className='poppinsMedium'>{message}</span> || 'success', {
    position: 'top-right',
    autoClose: time || 2500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className:"custom-toast-complete-test",
    transition:Slide
  });
};

export const ToastError = (message?: string, time?: number) => {
  toast['error'](<span className='poppinsMedium'>{message}</span>  || 'error', {
    position: 'top-right',
    autoClose: time || 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition:Slide
  });
};

export const ToastLoading = (message?: string, time?: number) => {
  toast['loading'](<span className='poppinsMedium'>{message}</span>  || 'loading', {
    position: 'top-right',
    autoClose: time || 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition:Slide
  });
};
