import { ChangeEvent } from 'react';
import style from './Select.module.css';

export interface WeekdaySelectProps {
    weekDayList: {
        id: string
        name: string
    }[]
    onChangeHandle: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ weekDayList, onChangeHandle }: WeekdaySelectProps): JSX.Element => {
    return (
        <select className={style['select']} onChange={onChangeHandle}>
            {weekDayList.map((wd) => <option value={wd.id} key={wd.id}>{wd.name}</option>)}
        </select>
    );
}