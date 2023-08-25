import styles from '@/components/LateralMenu/LateralMenu.module.css'
import { NavItem } from '../UI';

export interface LateralMenuProps {
    components: JSX.Element[]
    onChangeHandle?: string // Vai receber um setState
}

export const LateralMenu = ({ components }: LateralMenuProps) => {
    return (
        <nav className={styles['lateral-menu']}>
            {components.map((item, index) => <NavItem index={index} navItemComponent={item}/>)}
        </nav>
    );
}