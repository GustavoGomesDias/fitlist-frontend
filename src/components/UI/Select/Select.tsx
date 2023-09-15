import style from './Select.module.css';

export interface WeekdaySelectProps {
    weekDayList: {
        id: string
        name: string
    }[]
    key: string
}

export const Select = ({ weekDayList, key }: WeekdaySelectProps): JSX.Element => {
    console.log(key);
    return (
        <select key={key} className={style['select']}>
            {weekDayList.map((wd) => <option value={wd.id} key={wd.id + `-${key}`}>{wd.name}</option>)}
        </select>
    );
}