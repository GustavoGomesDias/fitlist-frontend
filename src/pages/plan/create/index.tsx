import { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
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
    const [exercism, setExercism] = useState<Omit<Exercism, 'id'>[]>([{
        description: '',
        name: '',
        sequence: -1,
        serie: -1,
        timeOff: -1,
        weekDayPlanId: '',
        repetition: -1,
        time: -1,
    }]);

    const handleChangeTraining = (e: ChangeEvent<HTMLInputElement>, property: keyof Omit<TrainingPlam, 'id'>) => {
        e.preventDefault();

        setTrainingPlan((prevState) => {
            console.log(prevState);
            prevState[property] = e.target.value

            return prevState;
        });

    }

    const handleChangeExercism = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: keyof Omit<Exercism, 'id'>, index: number) => {
        e.preventDefault();

        setExercism((prevState) => {
            const updatedValue = e.target.value;

            return prevState.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [property]: typeof item[property] === 'number' ? +updatedValue : updatedValue,
                    }
                    : item
            );
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


    const makeSecondStep = (exer: Omit<Exercism, 'id'>) => {
        return (<div className={`${styles['create-training-input-section']} ${styles['create-training-input-section-bb']}`} key={exer.name + `${exercism.length}`}>
            <div className={styles['create-training-delete']}>
                <FaTrash />
            </div>
            <Select onChangeHandle={(e) => handleChangeExercism(e, 'weekDayPlanId', (exercism.length - 1))} weekDayList={[{
                id: 'domingo',
                name: 'Domingo'
            }, {
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
            }, {
                id: 'sabado',
                name: 'Sábado'
            }]} />
            <Input
                id="name"
                name="name"
                placeholder="Nome"
                type="text"
                onChangeHandle={(e) => handleChangeExercism(e, 'name', (exercism.length - 1))}
                required
            />
            <Input
                id="description"
                name="description"
                placeholder="Breve descrição"
                type="text"
                onChangeHandle={(e) => handleChangeExercism(e, 'description', (exercism.length - 1))}
                required
            />
            <Input
                id="sequence"
                name="sequence"
                placeholder="Sequência do exercício no plano"
                type="number"
                onChangeHandle={(e) => handleChangeExercism(e, 'sequence', (exercism.length - 1))}
                required
            />
            <Input
                id="serie"
                name="serie"
                placeholder="Número de séries para o exercício"
                type="number"
                onChangeHandle={(e) => handleChangeExercism(e, 'serie', (exercism.length - 1))}
                required
            />
            <Input
                id="repetition"
                name="repetition"
                placeholder="Número de repetições"
                type="number"
                onChangeHandle={(e) => handleChangeExercism(e, 'repetition', (exercism.length - 1))}
            />
            <Input
                id="time"
                name="time"
                placeholder="Tempo do exercício"
                type="number"
                onChangeHandle={(e) => handleChangeExercism(e, 'time', (exercism.length - 1))}
            />
            <Input
                id="timeOff"
                name="timeOff"
                placeholder="Tempo de descanso"
                type="number"
                onChangeHandle={(e) => handleChangeExercism(e, 'timeOff', (exercism.length - 1))}
                required
            />
        </div>);
    }

    const secondStep = [<div className={`${styles['create-training-input-section']} ${styles['create-training-input-section-bb']}`} key={exercism[0].name + '0'}>
        <Select onChangeHandle={(e) => handleChangeExercism(e, 'weekDayPlanId', 0)} key={exercism[0].name + '0' + 'select'} weekDayList={[{
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
            onChangeHandle={(e) => handleChangeExercism(e, 'name', 0)}
            required
        />
        <Input
            id="description"
            name="description"
            placeholder="Breve descrição"
            type="text"
            onChangeHandle={(e) => handleChangeExercism(e, 'description', 0)}
            required
        />
        <Input
            id="sequence"
            name="sequence"
            placeholder="Sequência do exercício no plano"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'sequence', 0)}
            required
        />
        <Input
            id="serie"
            name="serie"
            placeholder="Número de séries para o exercício"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'serie', 0)}
            required
        />
        <Input
            id="repetition"
            name="repetition"
            placeholder="Número de repetições"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'repetition', 0)}
        />
        <Input
            id="time"
            name="time"
            placeholder="Tempo do exercício"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'time', 0)}
        />
        <Input
            id="timeOff"
            name="timeOff"
            placeholder="Tempo de descanso"
            type="number"
            onChangeHandle={(e) => handleChangeExercism(e, 'timeOff', 0)}
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
        e.preventDefault()

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


    const handleAddMoreExercism = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setExercism((prevState) => [...prevState, {
            description: '',
            name: '',
            sequence: -1,
            serie: -1,
            timeOff: -1,
            weekDayPlanId: '',
            repetition: -1,
            time: -1,
        }]);


        const component = makeSecondStep(exercism[exercism.length - 1]);

        setActualComponent((prevState) => [...prevState, component]);
    };

    const handleRemoveLastExercism = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        if (exercism.length > 1 && actualComponent.length > 1) {
            setActualComponent((prevState) => prevState.slice(0, -1));

            setExercism((prevState) => prevState.slice(0, -1));
        }

    };

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
                        <h3>Criar Plano de exercício</h3>
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
                                    text='Adicionar mais exercício'
                                    type='button'
                                    onClick={(e) => handleAddMoreExercism(e)}
                                />

                                <Button
                                    classType='normal'
                                    id='login-form-submit'
                                    text='Remover último formulário de exercício'
                                    type='button'
                                    onClick={(e) => handleRemoveLastExercism(e)}
                                />

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