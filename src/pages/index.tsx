import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import { Input, Button, LinkButton, Form } from '@/components/UI';
import { Logo } from '@/components';
import { SEO } from '@/components';
import { Fitlist } from '@/components';
import { User } from '@/data/models/User';
import { isEmail, isRequired } from '@/validations';
import { useAuth, useToast } from '@/hooks';
import { userTranslate } from '@/helpers';
import api, { Response } from '@/services/api';

type CreateUser = User & {
    confirmPassword: string
}

export default function Login() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const [loginUser, setLoginUser] = useState<Omit<User, 'name'>>({
        email: '',
        password: '',
    });
    const [createUserInfo, setCreateUserInfo] = useState<CreateUser>({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    });

    const { changeConfigToast, showToast, toast } = useToast({
        isVisible: false,
        message: 'Toast',
        type: 'success'
    });

    const { push } = useRouter();

    const { signIn, user} = useAuth();

    const handleChangeInputCreateUser = (e: ChangeEvent<HTMLInputElement>, property: keyof CreateUser) => {
        e.preventDefault();

        setCreateUserInfo((prevState) => ({
            ...prevState,
            [property]: e.target.value,

        }));
    }

    const handleChangeLoginUser = (e: ChangeEvent<HTMLInputElement>, property: keyof Omit<User, 'name'>) => {
        e.preventDefault();

        setLoginUser((prevState) => ({
            ...prevState,
            [property]: e.target.value,

        }));
    }


    const handleSubmitCreateUser = async (e: FormEvent) => {
        try {
            e.preventDefault();

            const requiredFields = isRequired(createUserInfo, ['name', 'email', 'password', 'confirmPassword']);

            if (requiredFields) {
                changeConfigToast({
                    message: `${userTranslate[requiredFields as keyof typeof userTranslate]} é necessário.`,
                    type: 'error',
                });
                showToast();

                return;
            }

            if (!isEmail(createUserInfo.email)) {
                changeConfigToast({
                    message: 'Formato do e-mail não aceito.',
                    type: 'error',
                });
                showToast();

                return;
            }

            if (createUserInfo.password !== createUserInfo.confirmPassword) {
                changeConfigToast({
                    message: 'Senha e Confirmar Senha não são iguais.',
                    type: 'error',
                });
                showToast();

                return;
            }

            const response = await api.post('/user/', {
                email: createUserInfo.email,
                name: createUserInfo.name,
                password: createUserInfo.password,
            });

            const responseJSON = response.data;

            if (response.status !== 201) {
                changeConfigToast({
                    message: responseJSON.body.error,
                    type: 'error',
                });
                showToast();

                return;
            }

            changeConfigToast({
                message: responseJSON.body.message,
                type: 'success',
            });
            showToast();

            return;
        } catch (e) {
            changeConfigToast({
                message: ((e as unknown as AxiosError).response as AxiosResponse).data.body.error,
                type: 'error',
            });
            showToast();
        }
    }


    const handleSubmitLogin = async (e: FormEvent) => {
        e.preventDefault();

        const requiredFields = isRequired(loginUser, ['email', 'password']);

        if (requiredFields) {
            changeConfigToast({
                message: `${userTranslate[requiredFields as keyof typeof userTranslate]} é necessário.`,
                type: 'error',
            });
            showToast();

            return;
        }

        await signIn(loginUser);
        push('/settings/id', '/settings/id');
    }

    return (
        <>
            <SEO />

            <div className={`${styles['home-content']}`}>
                <section className={`${styles['transition-logo']}`}>
                    <Logo size='md' hoverEffect={false} logoHeightClass='normal' />
                </section>

                <Fitlist />

                {toast()}

                <section className={`${styles['home-page-login-form']}`}>

                    {showLoginForm ? (<form onSubmit={async (e) => await handleSubmitLogin(e)} className={`${styles['login-form']}`}>
                        <Input id='email' name='email' placeholder='E-mail' type='text' onChangeHandle={(e) => handleChangeLoginUser(e, 'email')} />
                        <Input id='password' name='password' placeholder='Senha' type='password' onChangeHandle={(e) => handleChangeLoginUser(e, 'password')} />
                        <Button
                            classType='success'
                            id='login-form-submit'
                            text='Entrar'
                            type='submit'
                        />
                        <Button
                            classType='normal'
                            id='register-form'
                            text='Cadastrar-se'
                            type='button'
                            onClick={() => setShowLoginForm(false)}
                        />
                    </form>) : (<form action="#" className={`${styles['register-form']}`} onSubmit={async (e) => await handleSubmitCreateUser(e)}>
                        <Input id="email" name="email" placeholder="E-mail" type="text" onChangeHandle={(e) => handleChangeInputCreateUser(e, 'email')} />
                        <Input id="name" name="nam" placeholder="Nome" type="text" onChangeHandle={(e) => handleChangeInputCreateUser(e, 'name')} />
                        <Input id="password" name="password" placeholder="Senha" type="password" onChangeHandle={(e) => handleChangeInputCreateUser(e, 'password')} />
                        <Input id="con-password" name="con-password" placeholder="Confirmar Senha" type="password" onChangeHandle={(e) => handleChangeInputCreateUser(e, 'confirmPassword')} />
                        <Button
                            classType='success'
                            id='login-form-submit'
                            text='Cadastrar-se'
                            type='submit'
                        />
                        <Button
                            classType='normal'
                            id='register-form-back'
                            text='voltar'
                            type='button'
                            onClick={() => setShowLoginForm(true)}
                        />
                    </form>)}
                </section>
            </div>
        </>

    );
}
