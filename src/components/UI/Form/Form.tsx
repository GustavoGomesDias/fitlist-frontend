import style from './Form.module.css';

export interface FormProps {
    component: JSX.Element | JSX.Element[]
}

export const Form = ({ component }: FormProps): JSX.Element => {
    return (
        <form className={style['form']} >
            {component}
        </form>
    );
}