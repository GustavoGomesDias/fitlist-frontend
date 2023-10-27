import { LateralModal, LateralModalProps } from '@/components/UI';
import { useState, } from 'react';

export const useLateralModal = () => {
    const [configLateralModal, setConfigLateralModal] = useState<LateralModalProps>({
        component: [],
        handleShow: () => {},
        isOpen: false,
        title: '',
    });

    const showModal = () => {
        setConfigLateralModal((prevState) => ({
            ...prevState,
            isOpen: true
        }));
    };


    const changeConfigModal = (config: Partial<Omit<LateralModalProps, 'handleShow' | 'isOpen'>>) => {
        setConfigLateralModal((prevState) => ({
            ...prevState,
            ...config,
        }));
    }

    const closeModal = () => {
        setConfigLateralModal((prevState) => ({
            ...prevState,
            isOpen: false
        }));
    }

    const lateralModal = () => {
        return <LateralModal component={configLateralModal.component} handleShow={closeModal} isOpen={configLateralModal.isOpen} title={configLateralModal.title} />
    }


    return {
        showModal,
        changeConfigModal,
        closeModal,
        lateralModal
    }
}