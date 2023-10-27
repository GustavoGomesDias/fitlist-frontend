import { useState, MouseEvent, useEffect, useCallback } from 'react';
import Image from 'next/image';

import styles from './TrainingPanel.module.css';
import { WeekDayCard } from '../WeekDayCard/WeekDayCard';
import { Exercism } from '@/data/models/Exercism';
import { TrainigList } from '../TrainingList/TrainingList';
import { SettingSection } from '../Settings/SettingSection';
import { TrainingPlan } from '@/data/models/TrainingPlan';
import api from '@/services/api';
import { useCookies, useToast } from '@/hooks';
import { WeekDayPlan } from '@/data/models/WeekDayPlan';
import { weekDaysTranslate } from '@/helpers';
import { useRouter } from 'next/router';


export interface TrainigPanelProps {
    draggable: boolean
    trainingPlans: TrainingPlan[]
}

export const TrainingPanel = ({ draggable, trainingPlans }: TrainigPanelProps): JSX.Element => {
    const [showDropdown, setShowDrodown] = useState<boolean>(false);
    const [trainingTitle, setTrainingTitle] = useState<string>('Treino 1');
    const [renderTrainingList, setRenderTrainingList] = useState<boolean>(false);
    const [exercismList, setExercismList] = useState<Exercism[]>([]);
    const [weekDayPlanInfo, setWeekDayPlanInfo] = useState<string>('');
    const [weekDaysPlans, setWeekDayPlans] = useState<WeekDayPlan[]>([]);

    const { getCookie } = useCookies()

    const { toast, changeConfigToast, showToast } = useToast({
        isVisible: false,
        message: '',
        type: 'success',
    })

    const { push } = useRouter();


    const handleWeekDaysPlan = useCallback(async (trainingPlanId: string) => {
        const token = getCookie('token');
        const responseWeekDays = await api.get(`/trainingPlan/${trainingPlanId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (responseWeekDays.status === 200) {
            const { weekDayPlan } = responseWeekDays.data.body.content as { weekDayPlan: WeekDayPlan[] };
            setWeekDayPlans(weekDayPlan);
        } else {
            changeConfigToast({
                message: 'Erro interno, tente novamente mais tarde!',
                type: 'error',
            });
            showToast()
            return;
        }
    }, [])

    useEffect(() => {
        setTrainingTitle(trainingPlans.length> 0 ? trainingPlans[0].name : 'Sem planos de exercícios cadastrado.');
        if (trainingPlans.length > 0) {
            handleWeekDaysPlan(trainingPlans[0].id).catch(() => {
                changeConfigToast({
                    message: 'Erro interno, tente novamente mais tarde!',
                    type: 'error',
                });
                showToast()
                return;
            });
        }
    }, [handleWeekDaysPlan]);

    const handleShowDropdown = async (e: MouseEvent, trainingPlanId?: string, title?: string) => {
        e.preventDefault();
        if (title) {
            await handleWeekDaysPlan(trainingPlanId as string);
            setTrainingTitle(title)
        }
        setShowDrodown((prevState) => !prevState);
    }

    const handleRenderTrainingList = async (e: MouseEvent, weekDayPlanId: string): Promise<void> => {
        e.preventDefault();

        const weekDay = weekDaysPlans.find((wd) => wd.id === weekDayPlanId);

        const token = getCookie('token');
        const responseExercism = await api.get(`/weekdayplan/all/${weekDay?.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (responseExercism.status === 200) {
            const { exercism } = responseExercism.data.body.content as { exercism: Exercism[] };
            setExercismList(exercism);
        } else {
            changeConfigToast({
                message: 'Erro interno, tente novamente mais tarde!',
                type: 'error',
            });
            showToast()
            return;
        }
        setWeekDayPlanInfo(weekDaysTranslate[weekDay?.day as number]);
        setRenderTrainingList(true);
    };

    const handleShowWeekDayCard = (e: MouseEvent) => {
        e.preventDefault();
        setRenderTrainingList(false);
    };

    return (

        <SettingSection
            component={
                <>
                    {toast()}
                    <div className={styles['training-actions']}>
                        {trainingPlans.length > 0 && <Image src="/images/edit.svg" alt='Edit icon' width={25} height={25} />}
                        {trainingPlans.length > 0 && <Image src="/images/trash.svg" alt='Trash icon' width={25} height={25} />}
                    </div>
                    {trainingPlans.length > 0 ? (
                        <>{renderTrainingList ?
                            <div className={styles['fl-setting-training-list']}>
                                <h4 className={styles['fl-setting-training-list-weekday']}>{weekDayPlanInfo}</h4>
                                <TrainigList exercismList={exercismList} draggable={draggable} />

                                <div className={styles['fl-setting-training-list-title']} onClick={(e) => handleShowWeekDayCard(e)}>
                                    <Image src="/images/back.svg" alt="Voltar para Home" width="20" height="20" key="/images/settings.svg" title='Voltar para Home' /> <span>Voltar</span>
                                </div>
                            </div>
                            :
                            (<div className={styles['fl-setting-weekdays']}>
                                {weekDaysPlans.map((item, index) => <WeekDayCard rest={item.rest} weekDayPlanId={item.id} handleClickFn={handleRenderTrainingList} key={item.id} weekday={weekDaysTranslate[item.day]} training={''} />)}
                            </div>)}</>)
                        :
                        <div className={styles['fl-setting-weekdays']}>
                            <button className={styles['fl-settings-redirect']} onClick={(e) => {
                                e.preventDefault();

                                push('/plan/create', '/plan/create')
                            }}>Criar plano de exercício</button>
                        </div>}
                </>
            }
            dropdownProps={{
                hasDropdown: true,
                dropdownList: trainingPlans,
                handleShowDropdown: handleShowDropdown,
                showDropdown: showDropdown
            }}
            title={trainingTitle}
        />
    );
}