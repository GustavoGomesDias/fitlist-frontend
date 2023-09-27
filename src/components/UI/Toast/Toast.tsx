import style from './Toast.module.css';


export interface ToastProps {
    message: string
    type: 'error' | 'success'
    isVisible: boolean
}

export const Toast = ({ isVisible, message, type }: ToastProps): JSX.Element => {
    return (
        <div className={`${style['toast-container']} ${style[type]} ${isVisible ? style['show'] : ''}`}>
            <p>{message}</p>
            <span />
        </div>
    );
}