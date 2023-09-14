import { MouseEvent } from 'react';
import styles from './SettingSection.module.css';


export interface SettingsDropdownTitleProps {
    hasDropdown: boolean
    dropdownList?: string[]
    showDropdown?: boolean
    handleShowDropdown?:  (e: MouseEvent, title?: string) => void
}

export interface SettingSectionProps {
    title: string
    component: JSX.Element | JSX.Element[]
    dropdownProps: SettingsDropdownTitleProps
}

export const SettingSection = ({ title, component, dropdownProps }: SettingSectionProps): JSX.Element => {
    return (
        <section className={styles['fl-setting-section']}>
            <div>
                <h3 className={styles['fl-settings-header']} onClick={dropdownProps.hasDropdown ? (e) => (dropdownProps.handleShowDropdown as (e: MouseEvent, title?: string) => void)(e) : () => {}}>{title}</h3>

                <ul className={`${styles['fl-settings-dropdown']} ${dropdownProps.showDropdown ? styles['fl-settings-dropdown-show'] : ''}`}>
                    {dropdownProps.dropdownList && dropdownProps.dropdownList.map((item, index) => <li className={styles['fl-settings-dropdown-item']} onClick={dropdownProps.hasDropdown ? ((e) => (dropdownProps.handleShowDropdown as (e: MouseEvent, title?: string) => void)(e, item)) : () => {}} key={`${item}-${index}`}>{item}</li>)}
                </ul>
            </div>
            {component}
        </section>
    );
}