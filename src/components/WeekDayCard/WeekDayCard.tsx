import { MouseEvent } from 'react';
import { makeid } from '@/helpers';
import styles from './WeekDayCard.module.css'

export interface WeekDayCardProps {
    weekday: string
    training: string,
    handleClickFn?: (e: MouseEvent<HTMLDivElement>, weekDayPlanId: string, weekDay: string) => Promise<void>
    weekDayPlanId?: string
}

export const WeekDayCard = ({ weekday, training, handleClickFn, weekDayPlanId }: WeekDayCardProps) => {

    return (
        <div className={styles['card']} key={`${makeid(9)}-${weekday}-${training}`} onClick={handleClickFn  && ((e) => handleClickFn(e, weekDayPlanId as string, weekday))}>
            <span className={styles['weekday']}>{weekday}</span>
            <span className={styles['training']}>{training}</span>
        </div>
    );
}