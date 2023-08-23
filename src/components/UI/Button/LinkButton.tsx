import { HTMLAttributeAnchorTarget} from 'react';
import styles from '@/components/UI/Button/Button.module.css'

export interface LinkButtontProps {
    id: string
    classType: string
    href: string
    text: string
    target?: HTMLAttributeAnchorTarget
}

export const LinkButton = ({id, classType, text, href, target}: LinkButtontProps) => {
    return (
        <a href={href} target={target || ''} className={`${styles['fitlist-btn']} ${styles[classType]}`} id={id}>{text}</a>
    );
};