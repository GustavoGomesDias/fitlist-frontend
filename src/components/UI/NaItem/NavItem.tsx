import styles from 'UI/NaItem/NavItem.module.css'
import { makeid } from '@/helpers';

export interface NavItemProps {
    navItemComponent: JSX.Element | string
}

export const NavItem = ({ navItemComponent }: NavItemProps) => {

    return (
        <span key={makeid(9)} className={`${styles['ft-nav-item']}`}>{navItemComponent}</span>
    );
}