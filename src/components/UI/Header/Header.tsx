import { NavItem } from '../NaItem/NavItem';
import { Logo } from '../../Logo/Logo';
import style from 'UI/Header/Header.module.css';
import Link from 'next/link';
import { makeid } from '@/helpers';

export interface HeaderProps {
    navItemComponents: JSX.Element[]
}

export const Header = ({ navItemComponents }: HeaderProps) => {
    return (
        <header className={`${style['fl-header']}`}>
            <Link href='/' className={`${style['fl-header-logo']}`}>
                <Logo size='xl' logoHeightClass='header-logo' title='Voltar para tela inicial' />
            </Link>
            <nav className={`${style['fl-nav']}`}>
                {navItemComponents.map((navItem) => <NavItem navItemComponent={navItem} key={makeid(9)} />)}
            </nav>
        </header>
    )
}
