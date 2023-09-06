import { useState, MouseEvent } from 'react';
import styles from '@/components/TrainingSection/TrainingSection.module.css';
import Image from 'next/image';
import { TrainigList } from '@/components/TrainingList/TrainingList';


export type DropdownProps =  {
    type: 'trainingPlan' | 'weekDayPlan',
    show: boolean
}

export const TrainingSection = () => {

    const [trainingDropdown, setTrainingDropdown] = useState<DropdownProps>({
        type: 'trainingPlan',
        show: false,
    });

    const [trainingList, setTrainingList] = useState<string[]>([]);
    const [trainingPlan, setTrainingPlan] = useState<string>('Título do Treino');
    const [weekDayPlan, setWeekDayPlan] = useState<string>('Treino de peito / Segunda-feira');


    const handleClickInChangeTraining = (e: MouseEvent, type: 'trainingPlan' | 'weekDayPlan') => {
        e.preventDefault();

        if (type === 'trainingPlan') {

            setTrainingList(['Título do Treino 1', 'Título do Treino 2', 'Título do Treino 3', 'Título do Treino 4', 'Título do Treino 5', 'Título do Treino 6', 'Título do Treino 7', 'Título do Treino 8', 'Título do Treino 9']);
        } else {
            setTrainingList(['Treino de peito / Segunda-feira', 'Treino de peito / Segunda-feira', 'Treino de peito / Segunda-feira', 'Treino de peito / Segunda-feira', 'Treino de peito / Segunda-feira']);
        }

        setTrainingDropdown({
            type,
            show: true,
        });
    }

    const handleCLoseChangeTrainingDropdown = (e: MouseEvent, data: string) => {
        e.preventDefault();

        if (trainingDropdown.type === 'trainingPlan') {
            setTrainingPlan(data);
        } else {
            setWeekDayPlan(data);
        }

        setTrainingDropdown({
            type: trainingDropdown.type,
            show: false,
        });

    }

    return (
        <>
            <section className={`${styles['fd-training-title']}`}>
                <div className={`${styles['fd-dropdown']}`}>
                    <div className={styles['fd-dropdown-training']}>

                        <div className={`${styles['fd-sec-image']}`}>
                            <Image src="/images/dumbbell-solid.svg" alt="Training Icon" width={50} height={50} />
                        </div>
                        <div className={`${styles['title']}`}>
                            <h3 className={`${styles['fd-dropdown-training-title']}`} onClick={(e) => handleClickInChangeTraining(e, 'trainingPlan')}>{trainingPlan}</h3>

                            <div className={`${styles['fd-dropdown-training-subtitle']}`}>

                                <h3 className={`${styles['fd-title']}`} onClick={(e) => handleClickInChangeTraining(e, 'weekDayPlan')}>{weekDayPlan}</h3>
                                <div className={`${styles['play-btn']}`} title='Começar treino'>
                                    <Image src="/images/play.svg" alt="Play training" width={20} height={20} />
                                </div>
                            </div>
                            <ul className={`${styles['fd-dropdown-title-list']} ${trainingDropdown.show ? styles['fd-dropdown-title-list-show'] : ''}`}>
                                {trainingList.map((item, index) => <li onClick={(e) => handleCLoseChangeTrainingDropdown(e, item)} key={`${item}-${index}`} className={`${styles['fd-dropdown-title-item']}`}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <TrainigList />
        </>
    )
}
