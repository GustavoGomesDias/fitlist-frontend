import { MouseEvent } from 'react'
import styles from '@/components/UI/Button/Button.module.css'

export interface ButtontProps {
    id: string
    classType: 'success' | 'normal'
    text: string
    type: "button" | "submit" | "reset" | undefined
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({id, classType, text, type, onClick}: ButtontProps) => {
    return (
        <button type={type} className={`${styles['fitlist-btn']} ${styles[classType]}`} id={id} onClick={onClick ? (e) => (onClick as (e: MouseEvent<HTMLButtonElement>) => void)(e) : () => {}}>{text}</button>
    );
};