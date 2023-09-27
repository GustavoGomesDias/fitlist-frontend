import { FormEvent } from 'react';
import style from './Form.module.css';

export interface FormProps {
    component: JSX.Element | JSX.Element[]
    handleSubmit: (e: FormEvent) => void
}

export const Form = ({ component, handleSubmit }: FormProps): JSX.Element => {
    return (
        <form className={style['form']} onSubmit={(e) => handleSubmit(e)}>
            {component}
        </form>
    );
}