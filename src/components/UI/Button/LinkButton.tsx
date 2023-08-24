import { HTMLAttributeAnchorTarget} from 'react';
import Link from 'next/link'
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
        <Link href={href} target={target || ''} className={`${styles['fitlist-btn']} ${styles[classType]}`} id={id}>{text}</Link>
    );
};