import styles from '@/components/LateralMenu/LateralMenu.module.css'

export interface LateralMenuProps {
    borderBottom?: boolean
    texts: string[]
    onChangeHandle?: string // Vai receber um setState
}

export const LateralMenu = ({ texts, borderBottom }: LateralMenuProps) => {
    return (
        <nav className={styles['lateral-menu']}>
            {texts.map((item) => <span className={`${borderBottom ? styles['border-bottom'] : ''}`}>{item}</span>)}
        </nav>
    );
}