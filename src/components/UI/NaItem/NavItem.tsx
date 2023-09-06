import styles from 'UI/NaItem/NavItem.module.css'
import { makeid } from '@/helpers';

export interface NavItemProps {
    navItemComponent: JSX.Element
    index: number
}

export const NavItem = ({ navItemComponent, index }: NavItemProps) => {

    return (
        <span key={`${makeid(5)}-${index}}`} className={`${styles['ft-nav-item']}`}>{navItemComponent}</span>
    );
}