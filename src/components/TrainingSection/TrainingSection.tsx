import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import styles from '@/components/TrainingSection/TrainingSection.module.css';
import Image from 'next/image';

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
        <>
            <section className={`${styles['fd-training-title']}`}>
                <div className={`${styles['fd-dropdown']}`}>
                    <div className={styles['fd-dropdown-training']}>
                        <h3 className={`${styles['fd-dropdown-training-title']}`}>Título do Treino</h3>
                        <Image src="/images/more.svg" alt='More Icon - Open more training plans' width={25} height={25}/>
                    </div>

                    <ul className={`${styles['fd-dropdown-title-list']}`}>
                        <li className={`${styles['fd-dropdown-ttitle-item']}`}>Título do Treino 1</li>
                        <li className={`${styles['fd-dropdown-ttitle-item']}`}>Título do Treino 2</li>
                        <li className={`${styles['fd-dropdown-ttitle-item']}`}>Título do Treino 3</li>
                        <li className={`${styles['fd-dropdown-ttitle-item']}`}>Título do Treino 4</li>
                        <li className={`${styles['fd-dropdown-ttitle-item']}`}>Título do Treino 5</li>
                        <li className={`${styles['fd-dropdown-ttitle-item']}`}>Título do Treino 5</li>
                        <li className={`${styles['fd-dropdown-ttitle-item']}`}>Título do Treino 5</li>
                        <li className={`${styles['fd-dropdown-ttitle-item']}`}>Título do Treino 5</li>
                    </ul>
                </div>
            </section>
            <section className={`${styles['fd-training-section']}`}>
                <div className={`${styles['fd-weekdays']}`}>
                    {/* <h3 className={`${styles['fd-title']}`}>Dias da Semana</h3> */}
                    {daysOfWeek.slice(startIndex, startIndex + maxVisibleSpans).map((day, index) => (
                        <span key={index} className={`${styles['fd-days']} ${styles[`i-${index}`]}`} onClick={(e) => handleSpanClick(e, day, index)} title={day}>{day}</span>
                    ))}
                </div>

                <div className={`${styles['exercism-day-list']}`}>

                    <div className={`${styles['title']}`}>
                        <h3 className={`${styles['fd-title']}`}>Treino de peito</h3>
                        <div className={`${styles['play-btn']}`} title='Começar treino'>
                            <img src="/images/play.svg" alt="" />
                        </div>
                    </div>

                    <div className={`${styles['exercism-plan']}`}>
                        <div className={`${styles['exercism']}`}>
                            <span className={`${styles['fd-exer']} ${styles['fd-exer-selected']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                            <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
