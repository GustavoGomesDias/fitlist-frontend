import { ChangeEvent } from 'react';
import style from './Select.module.css';

export interface WeekdaySelectProps {
    weekDayList: {
        id: string
        day: string
        dayNumber?: number
    }[]
    onChangeHandle: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ weekDayList, onChangeHandle }: WeekdaySelectProps): JSX.Element => {

    return (
        <select className={style['select']} onChange={onChangeHandle} defaultValue={'DEFAULT'}>
            <option value="DEFAULT" disabled>Escolha o dia da semana...</option>
            {weekDayList.map((wd, index) => <option value={wd.dayNumber === null || wd.dayNumber === undefined ? wd.id : wd.dayNumber} key={wd.id}>{wd.day}</option>)}
        </select>
    );
}