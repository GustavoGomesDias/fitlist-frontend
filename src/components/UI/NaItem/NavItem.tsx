import styles from 'UI/NaItem/NavItem.module.css'

export interface NavItemProps {
    navItemComponent: JSX.Element | JSX.Element[]
}

export const NavItem = ({ navItemComponent }: NavItemProps) => {

    return (
        <span className={`${styles['ft-nav-item']}`}>{navItemComponent}</span>
    );
}