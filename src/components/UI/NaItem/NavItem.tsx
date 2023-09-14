import { useState, useEffect } from 'react';
import styles from 'UI/NaItem/NavItem.module.css'
import { makeid } from '@/helpers';

export interface NavItemProps {
    navItemComponent: JSX.Element | string | Record<any, any>
}

export const NavItem = ({ navItemComponent }: NavItemProps) => {
    const [navItem, setNavItem] = useState<JSX.Element | string>('');
    const [hasSetTypeFn, setHasSetTypeFn] = useState<boolean>(false);

    useEffect(() => {
        if ((navItemComponent as  Record<any, any>).content) {
            setNavItem((navItemComponent as  Record<any, any>).content);
            setHasSetTypeFn(true);
        } else {
            setNavItem(navItemComponent as string);
        }
    }, []);


    return (
        <span key={makeid(9)} className={`${styles['ft-nav-item']}`} onClick={hasSetTypeFn ? () => (navItemComponent as  Record<any, any>).setTypeFn((navItemComponent as  Record<any, any>).type): () => {}}>{navItem}</span>
    );
}