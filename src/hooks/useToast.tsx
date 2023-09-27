import { ToastProps, Toast } from '@/components/UI';
import { useState, useEffect } from 'react';

export const useToast = ({ isVisible, message, type}: ToastProps) => {
    const [configToast, setConfigToast] = useState<ToastProps>({
        isVisible,
        message,
        type,
    });

    useEffect(() => {
        if (configToast.isVisible) {
            const timer = setTimeout(() => {
                setConfigToast((prevState) => ({
                    ...prevState,
                    isVisible: false
                }));
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [configToast.isVisible]);

    const showToast = () => {
        setConfigToast((prevState) => ({
            ...prevState,
            isVisible: true
        }));
    };


    const changeConfigToast = (config: Partial<ToastProps>) => {
        setConfigToast((prevState) => ({
            ...prevState,
            ...config,
        }));
    }

    const toast = () => {
        return <Toast isVisible={configToast.isVisible} message={configToast.message} type={configToast.type} />;
    }


    return {
        showToast,
        changeConfigToast,
        toast,
    }
}