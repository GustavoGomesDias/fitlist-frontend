import { useState, MouseEvent, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Form, Header, Input, Select } from '@/components/UI';
import styles from '@/styles/Plan.module.css'
import { SEO } from '@/components';
import { Exercism } from '@/data/models/Exercism';
import { TrainingPlam } from '@/data/models/TrainingPlan';
import { isRequired } from '@/validations';
import { exercismTranslate, trainingFieldTranslate } from '@/helpers';
import { useCookies, useToast } from '@/hooks';
import api from '@/services/api';
import { UserInfo } from '@/context/types';

export default function CreatePlan() {
    const [step, setStep] = useState<number>(0);
    const [actualComponent, setActualComponent] = useState<JSX.Element[]>([]);
    const [trainingPlan, setTrainingPlan] = useState<Omit<TrainingPlam, 'id'> & { rest: number }>({
        description: '',
        name: '',
        rest: -1,
    });
    const [exercism, setExercism] = useState<Omit<Exercism, 'id'>>({
        description: '',
        name: '',
        sequence: -1,
        serie: -1,
        timeOff: -1,
        weekDayPlanId: '',
        repetition: -1,
        time: -1,
    });
    const [weekDayList, setWeekDayList] = useState<{
        day: string
        id: string
    }[]>([])

    const weekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

    const { changeConfigToast, showToast, toast } = useToast({
        isVisible: false,
        message: 'Toast',
        type: 'success'
    });

    const { getCookie } = useCookies();

    const handleChangeTraining = (e: ChangeEvent<HTMLInputElement>, property: keyof Omit<TrainingPlam, 'id'>) => {
        e.preventDefault();

        setTrainingPlan((prevState) => {
            prevState[property] = e.target.value

            return prevState;
        });

    }

    const handleChangeExercism = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: keyof Omit<Exercism, 'id'>) => {
        e.preventDefault();
        setExercism((prevState) => {
            const updatedValue = e.target.value;


            return {
                ...prevState,
                [property]: typeof prevState[property] == 'number' ? Number(updatedValue): updatedValue
            }
        });
    }

    const firstStep = <div className={`${styles['create-training-input-section']}`} key="first-step">
        <Input
            id="name"
            name="name"
            placeholder="Nome"
            type="text"
            onChangeHandle={(e) => handleChangeTraining(e, 'name')}
        />
        <Input
            id="description"
            name="description"
            placeholder="Breve descrição"
            type="text"
            onChangeHandle={(e) => handleChangeTraining(e, 'description')}
            required
        />
        <Select onChangeHandle={(e) => setTrainingPlan((prevState) => ({
            ...prevState,
            rest: Number(e.target.value),
        }))} key='' weekDayList={[{
            id: 'first-sunday',
            dayNumber: 0,
            day: 'Domingo',
        }, {
            id: 'first-monday',
            dayNumber: 1,
            day: 'Segunda-Feira'
        }, {
            id: 'first-tuesday',
            dayNumber: 2,
            day: 'Terça-Feira'
        }, {
            id: 'first-wednesday',
            dayNumber: 3,
            day: 'Quarta-Feira'
        }, {
            id: 'first-thursday',
            dayNumber: 4,
            day: 'Quinta-Feira'
        }, {
            id: 'first-friday',
            dayNumber: 5,
            day: 'Sexta-Feira'
        }, {
            id: 'first-saturday',
            dayNumber: 6,
            day: 'Sábado'
        }]} />
    </div>;

    const secondStep = (weekDays: {
        id: string
        day: string
    }[]) => [<div className={`${styles['create-training-input-section']} ${styles['create-training-input-section-bb']}`} key={exercism.name + '0'}>
        <Select onChangeHandle={(e) => handleChangeExercism(e, 'weekDayPlanId')} key={exercism.name + '0' + 'select'} weekDayList={weekDays.map((weekday) => ({
            id: weekday.id,
            day: weekday.day
        }))} />
        <Input
            id="name"
            name="name"
            placeholder="Nome"
            type="text"
            onChangeHandle={(e) => handleChangeExercism(e, 'name')}
            required
        />
        <Input
            id="description"
            name="description"
            placeholder="Breve descrição"
            type="text"
            onChangeHandle={(e) => handleChangeExercism(e, 'description')}
            required
        />
        <Input
            id="sequence"
            name="sequence"
            placeholder="Sequência do exercício no plano"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'sequence')}
            required
        />
        <Input
            id="serie"
            name="serie"
            placeholder="Número de séries para o exercício"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'serie')}
            required
        />
        <Input
            id="repetition"
            name="repetition"
            placeholder="Número de repetições"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'repetition')}
        />
        <Input
            id="time"
            name="time"
            placeholder="Tempo do exercício"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'time')}
        />
        <Input
            id="timeOff"
            name="timeOff"
            placeholder="Tempo de descanso"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'timeOff')}
            required
        />
    </div>];

    useEffect(() => {
        if (step === 1) {
            setActualComponent(secondStep(weekDayList));
        }


        if (step === 0) {
            setActualComponent([firstStep]);
        }
    }, [weekDayList]);

    const { back } = useRouter();

    const handleComponent = () => {
        if (step === 0) {
            setActualComponent(secondStep(weekDayList));
        }


        if (step === 1) {
            setActualComponent([firstStep]);
        }
    }

    const handleNextStep = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const requiredFieldTrainingPlan = isRequired(trainingPlan, ['description', 'name']);

        if (requiredFieldTrainingPlan) {
            changeConfigToast({
                message: `${trainingFieldTranslate[requiredFieldTrainingPlan as keyof typeof trainingFieldTranslate]} é necessário.`,
                type: 'error',
            });
            showToast()
            return;
        }
 
        if (step === 1) {
            return;
        }
        const mockedWeekDayPlans = [{
            id: 'uuid1',
            day: 0,
        }, {
            id: 'uuid2',
            day: 1,
        }, {
            id: 'uuid3',
            day: 2,
        }, {
            id: 'uuid4',
            day: 3,
        }, {
            id: 'uuid5',
            day: 4,
        }, {
            id: 'uuid6',
            day: 5,
        }, {
            id: 'uuid7',
            day: 6,
        }];

        const result = mockedWeekDayPlans.map((dayPlan) => ({ day: weekDays[dayPlan.day], id: dayPlan.id }));

        const token = getCookie('token');

        const user = JSON.parse(getCookie('user')) as UserInfo;

        const respomseTrainingPlan = await api.post('/trainingPlan', {
            name: trainingPlan.name,
            description: trainingPlan.description,
            userId: user.id,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respomseTrainingPlan.status === 201) {
            const { trainingPlanId } = respomseTrainingPlan.data.body.content;
            await api.post('/weekdayplan', {
                rest: trainingPlan.rest,
                trainingPlanId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        setWeekDayList(result)
        setStep((prevState) => prevState + 1);

        handleComponent();
    }

    const handlePrevStep = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (step === 0) {
            return;
        }

        setStep((prevState) => prevState - 1);

        handleComponent();
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        window.scrollTo({top: 0, behavior: 'smooth'});

        const requiredFieldExercism = isRequired(exercism, ['description', 'name', 'sequence', 'serie', 'timeOff', 'weekDayPlanId']);

        if (requiredFieldExercism) {
            changeConfigToast({
                message: `${exercismTranslate[requiredFieldExercism as keyof typeof exercismTranslate]} é necessário.`,
                type: 'error',
            });
            showToast();
            
            return;
        }

        if (exercism.repetition !== -1 && exercism.time !== -1) {
            changeConfigToast({
                message: 'O exercício deve ter repetições ou tempo de execução, nunca os dois.',
                type: 'error',
            });
            showToast();
            
            return;
        }


        // Chamada para API
    }

    return (
        <>
            <SEO />
            <Header
                navItemComponents={[
                    <Image src="/images/back.svg" alt="Voltar para Home" width="25" height="25" key="/images/settings.svg" title='Voltar para Home' onClick={() => back()} />
                ]}
            />

            {toast()}
            <section className={styles['create-training-section']}>
                <Form component={
                    <>
                        <h3>{step === 0 ? 'Criar Plano de exercício' : 'Adicionar exercício ao plano'}</h3>
                        <div className={styles['create-training-sequence']}>
                            <div
                                className={step === 0 ? styles['selected'] : ''}
                                // onClick={(e) => handleClickStepButton(e, 0)}
                            >
                                1
                            </div>
                            <div
                                className={step === 1 ? styles['selected'] : ''}
                                // onClick={(e) => handleClickStepButton(e, 1)}
                            >
                                2
                            </div>
                        </div>
                        {actualComponent.map((component) => component)}
                        {step === 0 && <Button
                            classType='success'
                            id='login-form-submit-next'
                            text='Próximo'
                            type='button'
                            onClick={(e) => handleNextStep(e)}
                        />}
                        {step === 1 && (
                            <>
                                <Button
                                    classType='success'
                                    id='login-form-submit'
                                    text='Enviar'
                                    type='submit'
                                />

                                <Button
                                    classType='normal'
                                    id='login-form-submit-back'
                                    text='Voltar'
                                    type='button'
                                    onClick={(e) => handlePrevStep(e)}
                                />
                            </>
                        )}
                    </>
                }handleSubmit={handleSubmit}  />
            </section>
        </>
    );
}