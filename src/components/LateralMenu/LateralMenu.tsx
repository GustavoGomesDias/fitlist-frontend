import styles from '@/components/LateralMenu/LateralMenu.module.css'
import { NavItem } from '../UI';
import { makeid } from '@/helpers';

export interface LateralMenuProps {
    components: JSX.Element[] | string[]
    onChangeHandle?: string // Vai receber um setState
}

export const LateralMenu = ({ components }: LateralMenuProps) => {
    return (
        <nav className={styles['lateral-menu']} key={makeid(9)}>
            <h2 className={styles['title']} key={makeid(9)}>Configurações</h2>
            {components.map((item) => <NavItem navItemComponent={item} key={makeid(9)}/>)}
        </nav>
    );
}