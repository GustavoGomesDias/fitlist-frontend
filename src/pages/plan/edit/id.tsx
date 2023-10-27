import { useState, MouseEvent, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Form, Header, Input, Select } from '@/components/UI';
import styles from '@/styles/Plan.module.css'
import { SEO } from '@/components';
import { Exercism } from '@/data/models/Exercism';
import { TrainingPlan } from '@/data/models/TrainingPlan';
import { isRequired } from '@/validations';
import { exercismTranslate, trainingFieldTranslate } from '@/helpers';
import { useCookies, useToast } from '@/hooks';
import api from '@/services/api';
import { UserInfo } from '@/context/types';
import { WeekDayPlan } from '@/data/models/WeekDayPlan';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function CreatePlan() {
    const [step, setStep] = useState<number>(0);
    const [actualComponent, setActualComponent] = useState<JSX.Element[]>([]);
    const [trainingPlan, setTrainingPlan] = useState<Omit<TrainingPlan, 'id'> & { rest: number }>({
        description: '',
        name: '',
        rest: -1,
    });
    const [exercism, setExercism] = useState<Omit<Exercism, 'id'>>({
        description: '',
        name: '',
        sequence: 0,
        serie: 0,
        timeOff: -1,
        weekDayPlanId: '',
        repetition: 0,
        time: 0,
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

    const handleChangeTraining = (e: ChangeEvent<HTMLInputElement>, property: keyof Omit<TrainingPlan, 'id'>) => {
        e.preventDefault();

        setTrainingPlan((prevState) => {
            prevState[property] = e.target.value

            return prevState;
        });

    }

    const handleChangeExercism = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: keyof Omit<Exercism, 'id'>) => {
        // e.preventDefault();
        setExercism((prevState) => {
            const updatedValue = e.target.value;

            console.log(e.target.value);
            return {
                ...prevState,
                [property]: typeof prevState[property] == 'number' ? Number(updatedValue) : updatedValue
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
    </div>;

    const secondStep = (weekDays: {
        id: string
        day: string
    }[]) => [<div className={`${styles['create-training-input-section']} ${styles['create-training-input-section-bb']}`} key={exercism.name + '0'}>
        <Select onChangeHandle={(e) => handleChangeExercism(e, 'weekDayPlanId')} key={exercism.name + '0' + 'select'} weekDayList={weekDays.map((weekday) => ({
            id: weekday.id,
            day: weekday.day
        }))} />

        <Select onChangeHandle={(e) => handleChangeExercism(e, 'weekDayPlanId')} key="exercism-list" defaultValue="Escolha um exercício..." exercismList={[{
            id: 'teste1',
            name: 'nome-exercicio'
        }]} />
        <Input
            id="name"
            name="name"
            placeholder="Nome"
            type="text"
            onChangeHandle={(e) => handleChangeExercism(e, 'name')}
            // value={exercism.name}
            required
        />
        <Input
            id="description"
            name="description"
            placeholder="Breve descrição"
            type="text"
            onChangeHandle={(e) => handleChangeExercism(e, 'description')}
            // value={exercism.description}
            required
        />
        <Input
            id="sequence"
            name="sequence"
            placeholder="Sequência do exercício no plano"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'sequence')}
            // value={exercism.sequence}
            required
        />
        <Input
            id="serie"
            name="serie"
            placeholder="Número de séries para o exercício"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'serie')}
            // value={exercism.serie}
            required
        />
        <Input
            id="repetition"
            name="repetition"
            placeholder="Número de repetições"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'repetition')}
        // value={exercism.repetition}
        />
        <Input
            id="time"
            name="time"
            placeholder="Tempo do exercício"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'time')}
        // value={exercism.time}
        />
        <Input
            id="timeOff"
            name="timeOff"
            placeholder="Tempo de descanso"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'timeOff')}
            // value={exercism.timeOff}
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

        // const token = getCookie('token');

        // const user = JSON.parse(getCookie('user')) as UserInfo;

        // const responseTrainingPlan = await api.post('/trainingPlan', {
        //     name: trainingPlan.name,
        //     description: trainingPlan.description,
        //     userId: user.id,
        // }, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // });

        // if (responseTrainingPlan.status === 201) {
        //     const { trainingPlanId } = responseTrainingPlan.data.body.content;
        //     await api.post('/weekdayplan', {
        //         rest: -1,
        //         trainingPlanId,
        //     }, {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     });


        //     const responseWeekDays = await api.get(`/trainingPlan/${trainingPlanId}`, {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     });

        //     if (responseWeekDays.status === 200) {
        //         const { weekDayPlan } = responseWeekDays.data.body.content as { weekDayPlan: WeekDayPlan[] };
        //         setWeekDayList(weekDayPlan.map((wd) => ({
        //             id: wd.id,
        //             day: weekDays[wd.day],
        //         })));
        //         setStep((prevState) => prevState + 1);

        //         handleComponent();
        //     } else {
        //         changeConfigToast({
        //             message: 'Erro interno, tente novamente mais tarde!',
        //             type: 'error',
        //         });
        //         showToast()
        //         return;
        //     }
        // } else {
        //     changeConfigToast({
        //         message: responseTrainingPlan.data.body.error,
        //         type: 'error',
        //     });
        //     showToast()
        //     return;
        // }


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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        window.scrollTo({ top: 0, behavior: 'smooth' });

        const requiredFieldExercism = isRequired(exercism, ['description', 'name', 'sequence', 'serie', 'timeOff', 'weekDayPlanId']);

        if (requiredFieldExercism) {
            changeConfigToast({
                message: `${exercismTranslate[requiredFieldExercism as keyof typeof exercismTranslate]} é necessário.`,
                type: 'error',
            });
            showToast();

            return;
        }

        if (exercism.repetition !== 0 && exercism.time !== 0) {
            changeConfigToast({
                message: 'O exercício deve ter repetições ou tempo de execução, nunca os dois.',
                type: 'error',
            });
            showToast();

            return;
        }

        // const token = getCookie('token');
        // const user = JSON.parse(getCookie('user')) as UserInfo;
        // const response = await api.post(`/exercism`, {
        //     ...exercism,
        //     userId: user.id,
        // }, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // });

        // if (response.status === 201) {
        //     changeConfigToast({
        //         message: response.data.body.message,
        //         type: 'success',
        //     });
        //     showToast();

        //     const inputs = document.querySelectorAll("input");

        //     const inpArrays = Array.from(inputs);

        //     inpArrays.forEach((inp) => (inp.value = ''))

        //     setExercism({
        //         description: '',
        //         name: '',
        //         sequence: 0,
        //         serie: 0,
        //         timeOff: 0,
        //         weekDayPlanId: '',
        //         repetition: 0,
        //         time: 0,
        //     })
        //     return;
        // } else {
        //     changeConfigToast({
        //         message: response.data.body.error,
        //         type: 'error',
        //     });
        //     showToast();

        //     return;
        // }
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
                } handleSubmit={handleSubmit} />
            </section>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { token } = parseCookies(ctx);
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
