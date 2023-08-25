import styles from '@/components/Logo/Logo.module.css'

export interface LoginProps {
    size: 'xl' | 'md'
    hoverEffect?: boolean
    logoHeightClass: string
    title?: string
}

export const Logo = ({ size, hoverEffect, logoHeightClass, title }: LoginProps) => {

    return (
        <h1 className={`${styles['logo']} ${hoverEffect ? styles['logo-non-transition'] : ''} ${styles[size]} ${styles[logoHeightClass]}`} title={title || ''}>FitList</h1>
    );
};