import style from './Toast.module.css';

export const Tosat = (): JSX.Element => {
    return (
        <div className={`${style['toast-container']} ${style['success']}`}>
            <p>Texxtando Texxtando Texxtando Texxtando Texxtando Texxtando</p>
            <span />
        </div>
    );
}