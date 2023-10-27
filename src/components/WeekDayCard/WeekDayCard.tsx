import { MouseEvent } from 'react';
import { makeid } from '@/helpers';
import styles from './WeekDayCard.module.css'
import { WeekDayPlan } from '@/data/models/WeekDayPlan';

export interface WeekDayCardProps {
    weekday: string
    training: string,
    handleClickFn?: (e: MouseEvent<HTMLDivElement>, weekDayPlanId: string) => Promise<void>
    weekDayPlanId?: string,
    rest: boolean
}

export const WeekDayCard = ({ weekday, training, handleClickFn, weekDayPlanId, rest }: WeekDayCardProps) => {

    return (
        <div className={`${styles['card']} ${rest && styles['rest']}`} key={weekDayPlanId} onClick={handleClickFn  && ((e) => handleClickFn(e, weekDayPlanId as string))}>
            <span className={styles['weekday']}>{weekday}</span>
            <span className={styles['training']}>{training}</span>
        </div>
    );
}