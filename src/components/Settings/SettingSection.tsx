import { MouseEvent } from 'react';
import styles from './SettingSection.module.css';
import { TrainingPlan } from '@/data/models/TrainingPlan';


export interface SettingsDropdownTitleProps {
    hasDropdown: boolean
    dropdownList?: TrainingPlan[]
    showDropdown?: boolean
    handleShowDropdown?:  (e: MouseEvent, trainingPlanId: string, title?: string) => void
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
                <h3
                    title={dropdownProps.hasDropdown ? `${title} - Clique para mudar de plano de treino` : title}
                    className={`${styles['fl-settings-header']} ${dropdownProps.hasDropdown ? styles['fl-settings-header-h']: ''}`}
                    onClick={dropdownProps.hasDropdown ? (e) => (dropdownProps.handleShowDropdown as (e: MouseEvent, title?: string) => void)(e) : () => {}}
                >
                    {title}
                </h3>

                <ul className={`${styles['fl-settings-dropdown']} ${dropdownProps.showDropdown ? styles['fl-settings-dropdown-show'] : ''}`}>
                    {dropdownProps.dropdownList && dropdownProps.dropdownList.map((item, index) => <li className={styles['fl-settings-dropdown-item']} onClick={dropdownProps.hasDropdown ? ((e) => (dropdownProps.handleShowDropdown as (e: MouseEvent, trainingPlanId: string, title?: string) => void)(e, item.id, item.name)) : () => {}} key={`${item}-${index}`}>{item.name}</li>)}
                </ul>
            </div>
            {component}
        </section>
    );
}