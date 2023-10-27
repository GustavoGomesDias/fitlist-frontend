import { useState, DragEvent } from 'react';
import { Exercism } from '@/data/models/Exercism';
import styles from './TrainingList.module.css';
import { makeid } from '@/helpers';
import Image from 'next/image';
import { useLateralModal } from '@/hooks';

export interface TrainigListProps {
    exercismList: Exercism[]
    draggable: boolean
}

export const TrainigList = ({ exercismList, draggable }: TrainigListProps): JSX.Element => {
    const [items, setItems] = useState<Exercism[]>(exercismList);

    const { changeConfigModal, closeModal, lateralModal, showModal } = useLateralModal();

    const handleOpenEditModal = (exercism: Exercism) => {
        changeConfigModal({
            component: <span>{exercism.id}</span>,
            title: exercism.name,
        })

        showModal();
    }

    const handleDragStart = (e: DragEvent, index: number, id: string) => {
        e.dataTransfer.setData('index', String(index));

        const exer = document.getElementById(id);

        if (exer !== null && exer !== undefined) {
            const elements = document.getElementsByClassName(`${styles['fd-exer']}`);

            if (elements !== null && elements !== undefined) {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].setAttribute('style', 'opacity: 0.4');
                }
            }
            exer.setAttribute('style', 'opacity: 1;');
        }
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
        <>
            {lateralModal()}
            <section className={`${styles['fd-training-section']}`}>

                <div className={`${styles['exercism-day-list']}`}>

                    <div className={`${styles['exercism-plan']}`}>
                        <div className={`${styles['exercism']}`}>
                            {items.map((exercism, index) =>
                                <span
                                    id={exercism.name}
                                    draggable={draggable}
                                    onDragStart={draggable ? (e => handleDragStart(e, index, exercism.name)) : (e) => { }}
                                    onDragOver={draggable ? (e) => handleDragOver(e) : (e) => { }}
                                    onDrop={draggable ? (e) => handleDropItem(e, index) : (e) => { }}
                                    key={makeid(9)}
                                    className={`${styles['fd-exer']}`}>
                                    {exercism.name} / {exercism.time ? `${exercism.time}s` : exercism.repetition}x{exercism.serie} - {exercism.timeOff}s off
                                    <div className={styles['training-actions']}>
                                        {<Image src="/images/edit.svg" alt='Edit icon' width={25} height={25} onClick={() => handleOpenEditModal(exercism)}/>}
                                        {<Image src="/images/trash.svg" alt='Trash icon' width={25} height={25} />}
                                    </div>
                                </span>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}