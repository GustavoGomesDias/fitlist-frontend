import { useState, MouseEvent } from 'react';

import styles from './TrainingPanel.module.css';
import { WeekDayCard } from '../WeekDayCard/WeekDayCard';

export const TrainingPanel = (): JSX.Element => {
    const [showDropdown, setShowDrodown] = useState<boolean>(false);

    const [trainingTitle, setTrainingTitle] = useState<string>('Treino 1');

    const handleShowDropdown = (e: MouseEvent, title?: string) => {
        e.preventDefault();

        if (title) {
            setTrainingTitle(title)
        }
        setShowDrodown((prevState) => !prevState);
    }

    const trainingsMock = [{
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }];

    const trainingListMock = ['Treino 1', 'Treino 2', 'Treino 3', 'Treino 4', 'Treino 5', 'Treino 6', 'Treino 7', 'Treino 8', 'Treino 9', 'Treino 10', 'Treino 11', 'Treino 12', 'Treino 13'];

    return (
        <section className={styles['fl-setting-section']}>
            <div>
                <h3 className={styles['fl-settings-header']} onClick={(e) => handleShowDropdown(e)}>{trainingTitle}</h3>

                <ul className={`${styles['fl-settings-dropdown']} ${showDropdown ? styles['fl-settings-dropdown-show'] : ''}`}>
                    {trainingListMock.map((item, index) => <li className={styles['fl-settings-dropdown-item']} onClick={(e => handleShowDropdown(e, item))} key={`${item}-${index}`}>{item}</li>)}
                </ul>
            </div>

            <div className={styles['fl-setting-weekdays']}>
                {trainingsMock.map((item, index) => <WeekDayCard key={`${item.weekday}-${index}`} weekday={item['weekday']} training={item['training']} />)}
            </div>
        </section>
    );
}