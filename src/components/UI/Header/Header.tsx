import { NavItem } from '../NaItem/NavItem';
import { Logo } from '../../Logo/Logo';
import style from 'UI/Header/Header.module.css';

export interface HeaderProps {
    navItemComponents: JSX.Element[]
}

export const Header = ({ navItemComponents }: HeaderProps) => {
    return (
        <header className={`${style['fl-header']}`}>
            <Logo size='xl' hoverEffect />
            <nav className={`${style['fl-nav']}`}>
                {navItemComponents.map((navItem) => <NavItem navItemComponent={navItem}/>)}
            </nav>
        </header>
    )
}
