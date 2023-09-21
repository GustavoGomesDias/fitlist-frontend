import { useState, MouseEvent, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import { Button, Form, Header, Input, Select } from '@/components/UI';
import styles from '@/styles/Plan.module.css'
import { SEO } from '@/components';
import { Exercism } from '@/data/models/Exercism';
import { TrainingPlam } from '@/data/models/TrainingPlan';

export default function CreatePlan() {
    const [step, setStep] = useState<number>(0);
    const [actualComponent, setActualComponent] = useState<JSX.Element[]>([]);
    const [trainingPlan, setTrainingPlan] = useState<Omit<TrainingPlam, 'id'>>({
        description: '',
        name: '',
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

    const handleChangeTraining = (e: ChangeEvent<HTMLInputElement>, property: keyof Omit<TrainingPlam, 'id'>) => {
        e.preventDefault();

        setTrainingPlan((prevState) => {
            console.log(prevState);
            prevState[property] = e.target.value

            return prevState;
        });

    }

    const handleChangeExercism = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: keyof Omit<Exercism, 'id'>) => {
        e.preventDefault();

        console.log(property)
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
    </div>;

    const secondStep = [<div className={`${styles['create-training-input-section']} ${styles['create-training-input-section-bb']}`} key={exercism.name + '0'}>
        <Select onChangeHandle={(e) => handleChangeExercism(e, 'weekDayPlanId')} key={exercism.name + '0' + 'select'} weekDayList={[{
            id: 'segunda',
            name: 'Segunda-Feira'
        }, {
            id: 'terça',
            name: 'Terça-Feira'
        }, {
            id: 'quarta',
            name: 'Quarta-Feira'
        }, {
            id: 'Quinta',
            name: 'Terça-Feira'
        }, {
            id: 'Sexta',
            name: 'Sexta-Feira'
        }]} />
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
            setActualComponent(secondStep);
        }


        if (step === 0) {
            setActualComponent([firstStep]);
        }
    }, []);

    const { back } = useRouter();

    const handleComponent = () => {
        if (step === 0) {
            setActualComponent(secondStep);
        }


        if (step === 1) {
            setActualComponent([firstStep]);
        }
    }

    const handleNextStep = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (step === 1) {
            return;
        }
        setStep((prevState) => prevState + 1);

        handleComponent();
    }

    const handlePrevStep = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        console.log(exercism);

        console.log(step);
        if (step === 0) {
            return;
        }

        setStep((prevState) => prevState - 1);

        handleComponent();
    }


    const handleClickStepButton = (e: MouseEvent<HTMLDivElement>, stepNumber: number) => {
        e.preventDefault();

        setStep(stepNumber);
        handleComponent();
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <>
            <SEO />
            <Header
                navItemComponents={[
                    <Image src="/images/back.svg" alt="Voltar para Home" width="25" height="25" key="/images/settings.svg" title='Voltar para Home' onClick={() => back()} />
                ]}
            />

            <section className={styles['create-training-section']}>
                <Form component={
                    <>
                        <h3>{step === 0 ? 'Criar Plano de exercício' : 'Adicionar exercício ao plano'}</h3>
                        <div className={styles['create-training-sequence']}>
                            <div
                                className={step === 0 ? styles['selected'] : ''}
                                onClick={(e) => handleClickStepButton(e, 0)}
                            >
                                1
                            </div>
                            <div
                                className={step === 1 ? styles['selected'] : ''}
                                onClick={(e) => handleClickStepButton(e, 1)}
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
                } />
            </section>
        </>
    );
}