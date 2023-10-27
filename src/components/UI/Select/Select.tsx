import { ChangeEvent } from 'react';
import style from './Select.module.css';

export interface WeekdaySelectProps {
    weekDayList?: {
        id: string
        day: string
        dayNumber?: number
    }[]

    exercismList?: {
        id: string,
        name: string,
    }[]

    defaultValue?: string

    onChangeHandle: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ weekDayList, exercismList, onChangeHandle, defaultValue }: WeekdaySelectProps): JSX.Element => {

    return (
        <select className={style['select']} onChange={onChangeHandle} defaultValue={'DEFAULT'}>
            <option value="DEFAULT" disabled>{defaultValue || 'Escolha uma opção...'}</option>
            {weekDayList !== undefined && weekDayList.map((wd, index) => <option value={wd.dayNumber === null || wd.dayNumber === undefined ? wd.id : wd.dayNumber} key={wd.id}>{wd.day}</option>)}
            {exercismList !== undefined && exercismList.map((exer, index) => <option value={exer.id} key={exer.id}>{exer.name}</option>)}
        </select>
    );
}