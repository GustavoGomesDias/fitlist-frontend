import styles from '@/components/UI/Button/Button.module.css'

export interface ButtontProps {
    id: string
    classType: string
    text: string
    type: "button" | "submit" | "reset" | undefined
}

export const Button = ({id, classType, text, type}: ButtontProps) => {
    return (
        <button type={type} className={`${styles['fitlist-btn']} ${styles[classType]}`} id={id}>{text}</button>
    );
};