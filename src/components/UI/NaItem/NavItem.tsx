import styles from 'UI/NaItem/NavItem.module.css'

export interface NavItemProps {
    navItemComponent: JSX.Element | JSX.Element[]
    index: number
}

export const NavItem = ({ navItemComponent, index }: NavItemProps) => {

    return (
        <span key={index} className={`${styles['ft-nav-item']}`}>{navItemComponent}</span>
    );
}