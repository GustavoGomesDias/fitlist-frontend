import { ChangeEvent } from 'react';
import style from './Select.module.css';

export interface WeekdaySelectProps {
    weekDayList: {
        id: string
        day: string
    }[]
    onChangeHandle: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ weekDayList, onChangeHandle }: WeekdaySelectProps): JSX.Element => {
    return (
        <select className={style['select']} onChange={onChangeHandle}>
            {weekDayList.map((wd, index) => <option value={wd.id} key={wd.id} selected={index === 0}>{wd.day}</option>)}
        </select>
    );
}