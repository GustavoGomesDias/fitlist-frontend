import { useState, DragEvent } from 'react';
import { Exercism } from '@/data/models/Exercism';
import styles from './TrainingList.module.css';
import { makeid } from '@/helpers';

export interface TrainigListProps {
    exercismList: Exercism[]
}

export const TrainigList = ({ exercismList }: TrainigListProps): JSX.Element => {
    const [items, setItems] = useState<Exercism[]>(exercismList);

    const handleDragStart = (e: DragEvent, index: number) => {
        e.dataTransfer.setData('index', String(index));
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    }


    const handleDropItem = (e: DragEvent, newIndex: number) => {
        e.preventDefault();

        const oldIndex = e.dataTransfer.getData('index');

        const updateItems = [...items];
        const [draggedITem] = updateItems.splice(Number(oldIndex), 1);

        updateItems.splice(newIndex, 0, draggedITem);

        setItems(updateItems);
    }

    return (
        <section className={`${styles['fd-training-section']}`}>

            <div className={`${styles['exercism-day-list']}`}>

                <div className={`${styles['exercism-plan']}`}>
                    <div className={`${styles['exercism']}`}>
                        {items.map((exercism, index) =>
                            <span
                                draggable="true"
                                onDragStart={(e => handleDragStart(e, index))}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDropItem(e, index)}
                                key={makeid(9)}
                                className={`${styles['fd-exer']}`}>
                                    {exercism.name} / {exercism.time ? `${exercism.time}s` : exercism.repetition}x{exercism.serie} - {exercism.timeOff}s off
                            </span>)}
                    </div>
                </div>
            </div>
        </section>
    );
}