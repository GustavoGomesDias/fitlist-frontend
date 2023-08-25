import styles from '@/components/Logo/Logo.module.css'

export interface LoginProps {
    size: 'xl' | 'md'
    hoverEffect?: boolean
    logoHeightClass: string
}

export const Logo = ({ size, hoverEffect, logoHeightClass }: LoginProps) => {

    return (
        <h1 className={`${styles['logo']} ${hoverEffect ? styles['logo-non-transition'] : ''} ${styles[size]} ${styles[logoHeightClass]}`}>FitList</h1>
    );
};