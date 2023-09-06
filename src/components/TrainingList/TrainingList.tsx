import { useState } from 'react';
import { Exercism } from '@/data/models/Exercism';
import styles from './TrainingList.module.css';
import { makeid } from '@/helpers';

export interface TrainigListProps {
    exercismList: Exercism[]
}

export const TrainigList = ({ exercismList }: TrainigListProps): JSX.Element => {
    const [draggedItem, setDraggedItem] = useState<Exercism | undefined>(undefined);
    return (
        <section className={`${styles['fd-training-section']}`}>

            <div className={`${styles['exercism-day-list']}`}>

                <div className={`${styles['exercism-plan']}`}>
                    <div className={`${styles['exercism']}`}>
                        {exercismList.map((exercism) => <span draggable="true" key={makeid(9)} className={`${styles['fd-exer']}`}>{exercism.name} / {exercism.time ? `${exercism.time}s` : exercism.repetition}x{exercism.serie} - {exercism.timeOff}s off</span>)}
                    </div>
                </div>
            </div>
        </section>
    );
}