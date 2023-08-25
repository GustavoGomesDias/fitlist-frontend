import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import styles from '@/components/TrainingSection/TrainingSection.module.css';

export const TrainingSection = () => {
    const [startIndex, setStartIndex] = useState(0);
    const daysOfWeek = [
        'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira',
        'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'
    ];

    const maxVisibleSpans = 3;


    const handleSpanClick = (e: MouseEvent<HTMLSpanElement>, day: string, spanIndex: number) => {
        console.log(daysOfWeek.indexOf(day));

        if (startIndex === 6) {
            setStartIndex(0);
            return;
        }

        if (spanIndex === 0 && daysOfWeek.indexOf(day) !== 0) {
            console.log(startIndex)
            let subtract = 2
            if (daysOfWeek.indexOf(day) === 1) subtract = 1;
            setStartIndex((prevState) => prevState - subtract);
            return;
        }

        setStartIndex(daysOfWeek.indexOf(day));
    }

    return (
        <section className={`${styles['fd-training-section']}`}>
            <div className={`${styles['fd-weekdays']}`}>
                {/* <h3 className={`${styles['fd-title']}`}>Dias da Semana</h3> */}
                {daysOfWeek.slice(startIndex, startIndex + maxVisibleSpans).map((day, index) => (
                    <span key={index} className={`${styles['fd-days']} ${styles[`i-${index}`]}`} onClick={(e) => handleSpanClick(e, day, index)} title={day}>{day}</span>
                ))}
            </div>

            <div className={`${styles['exercism-plan']}`}>
                <div className={`${styles['title']}`}>
                    <h3 className={`${styles['fd-title']}`}>Treino de peito</h3>
                    <div className={`${styles['play-btn']}`} title='Começar treino'>
                        <img src="/images/play.svg" alt="" />
                    </div>
                </div>
                <div className={`${styles['exercism']}`}>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                    <span className={`${styles['fd-exer']}`}>Segunda</span>
                </div>
            </div>
        </section>
    )
}
