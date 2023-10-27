import styles from './LateralModal.module.css';
import Image from 'next/image';

export interface LateralModalProps {
    title: string
    component: JSX.Element | JSX.Element[]
    handleShow: () => void
    isOpen: boolean
}

export const LateralModal = ({ component, title, handleShow, isOpen }: LateralModalProps): JSX.Element => {
    return (
        <div className={`${styles['modal-body']} ${isOpen && styles['show']}`}>
            <div className={styles['header']}>
                <Image src="/images/back.svg" alt="Voltar para Home" width="25" height="25" key="/images/settings.svg" title='Voltar para Home' onClick={() => handleShow()} />
                <h3>{title}</h3>
            </div>
            {component}
        </div>
    )
}