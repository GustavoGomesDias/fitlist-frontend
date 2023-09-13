import { useState, MouseEvent } from 'react';
import Image from 'next/image';

import styles from './TrainingPanel.module.css';
import { WeekDayCard } from '../WeekDayCard/WeekDayCard';
import { Exercism } from '@/data/models/Exercism';
import { TrainigList } from '../TrainingList/TrainingList';
import { makeid } from '@/helpers';


export interface TrainigPanelProps {
    draggable: boolean
}

export const TrainingPanel = ({ draggable }: TrainigPanelProps): JSX.Element => {
    const [showDropdown, setShowDrodown] = useState<boolean>(false);
    const [trainingTitle, setTrainingTitle] = useState<string>('Treino 1');
    const [renderTrainingList, setRenderTrainingList] = useState<boolean>(false);
    const [exercismList, setExercismList] = useState<Exercism[]>([]);
    const [weekDayPlanInfo, setWeekDayPlanInfo] = useState<string>('');

    const handleShowDropdown = (e: MouseEvent, title?: string) => {
        e.preventDefault();

        if (title) {
            setTrainingTitle(title)
        }
        setShowDrodown((prevState) => !prevState);
    }

    const handleRenderTrainingList = async (e: MouseEvent, weekDayPlanId: string, weekDay: string): Promise<void> => {
        e.preventDefault();

        const exercisms: Exercism[] = await Promise.resolve(() => [{
            id: 'a1',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }, {
            id: 'a2',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }, {
            id: 'a3',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }, {
            id: 'a4',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }, {
            id: 'a5',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }, {
            id: 'a6',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }, {
            id: 'a7',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }, {
            id: 'a8',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }, {
            id: 'a9',
            serie: 3,
            repetition: 8,
            name: `Flexão declinada - ${makeid(9)}`,
            description: 'Flexão com os pés em alguma coisa elevada e as mãos no chão.',
            sequence: 1,
            timeOff: 30
        }]) as unknown as Exercism[];

        setExercismList(exercisms);
        setWeekDayPlanInfo(weekDay);
        setRenderTrainingList(true);
    };

    const handleShowWeekDayCard = (e: MouseEvent) => {
        e.preventDefault();
        setRenderTrainingList(false);
    };

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
            {renderTrainingList ?
                <div className={styles['fl-setting-training-list']}>
                    <h4 className={styles['fl-setting-training-list-weekday']}>{weekDayPlanInfo}</h4>
                    <TrainigList exercismList={exercismList} draggable={draggable} />

                    <div className={styles['fl-setting-training-list-title']} onClick={(e) => handleShowWeekDayCard(e)}>
                        <Image src="/images/back.svg" alt="Voltar para Home" width="20" height="20" key="/images/settings.svg" title='Voltar para Home' /> <span>Voltar</span>
                    </div>
                </div>
                :
                (<div className={styles['fl-setting-weekdays']}>
                    {trainingsMock.map((item, index) => <WeekDayCard weekDayPlanId={String(index)} handleClickFn={handleRenderTrainingList} key={`${item.weekday}-${index}`} weekday={item['weekday']} training={item['training']} />)}
                </div>)
            }

        </section>
    );
}