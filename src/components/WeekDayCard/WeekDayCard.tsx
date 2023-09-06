import { makeid } from '@/helpers';
import styles from './WeekDayCard.module.css'

export interface WeekDayCardProps {
    weekday: string
    training: string,
}

export const WeekDayCard = ({ weekday, training }: WeekDayCardProps) => {

    return (
        <div className={styles['card']} key={`${makeid(9)}-${weekday}-${training}`}>
            <span className={styles['weekday']}>{weekday}</span>
            <span className={styles['training']}>{training}</span>
        </div>
    );
}