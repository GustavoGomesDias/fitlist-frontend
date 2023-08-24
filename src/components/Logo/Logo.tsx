import styles from '@/components/Logo/Logo.module.css'

export interface LoginProps {
    size: string
    hoverEffect: boolean
}

export const Logo = ({ size, hoverEffect }: LoginProps) => {

    return (
        <h1 className={`${styles['logo']} ${hoverEffect ? styles['logo-non-transition'] : ''} ${styles[size]}`}>FitList</h1>
    );
};