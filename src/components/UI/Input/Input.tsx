import { HTMLInputTypeAttribute, ChangeEvent, useEffect } from 'react';
import styles from 'UI/Input/Input.module.css'

export interface InputProps {
    id: string
    placeholder: string
    onChangeHandle: (e: ChangeEvent<HTMLInputElement>) => void
    type?: HTMLInputTypeAttribute
    name: string
    value?: string
    readonly?: boolean
    width?: string
}

export const Input = ({id, placeholder, type, name, onChangeHandle, value, readonly, width }: InputProps) => {

    useEffect(() => {
        const input = document.getElementById(id);

        if (input) {
            input.setAttribute('style', `width: ${width ? width : '80%'}`);
        }
    }, []);

    return (
        <input  placeholder={placeholder} type={type || 'text'} name={name} id={id} className={`${styles['input-form']} ${readonly && styles['input-form-readonly']}`} value={value} readOnly={readonly}/>
    );
};