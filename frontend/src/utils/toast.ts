import {Bounce, toast, ToastOptions} from 'react-toastify';

export const notify = (content: string, options?: ToastOptions) =>
    toast(content, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        closeButton: false,
        theme: 'colored',
        transition: Bounce,
        ...options,
    });

export const dismissAllToast = () => toast.dismiss();
