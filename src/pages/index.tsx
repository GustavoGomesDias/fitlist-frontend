import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '@/styles/Home.module.css'
import { Input, Button, LinkButton, Form } from '@/components/UI';
import { Logo } from '@/components';
import { SEO } from '@/components';
import { Fitlist } from '@/components';
import { User } from '@/data/models/User';
import { isEmail, isRequired } from '@/validations';
import { useToast } from '@/hooks';
import { createUserTranslate } from '@/helpers';
import api, { Response } from '@/services/api';

type CreateUser = User & {
    confirmPassword: string
}

export default function Login() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
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

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, property: keyof CreateUser) => {
        e.preventDefault();

        setCreateUserInfo((prevState) => ({
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
                    message: `${createUserTranslate[requiredFields as keyof typeof createUserTranslate]} é necessário.`,
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

            console.log(response);

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
                message: 'Erro interno, tente novamente mais tarde.',
                type: 'error',
            });
            showToast();
        }
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

                {showLoginForm ? (<form action="#" className={`${styles['login-form']}`}>
                    <Input id='email' name='email' placeholder='E-mail' type='text' onChangeHandle={(e) => { }} />
                    <Input id='password' name='password' placeholder='Senha' type='password' onChangeHandle={(e) => { }} />
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
                    <Input id="email" name="email" placeholder="E-mail" type="text" onChangeHandle={(e) => handleChangeInput(e, 'email')} />
                    <Input id="name" name="nam" placeholder="Nome" type="text" onChangeHandle={(e) => handleChangeInput(e, 'name')} />
                    <Input id="password" name="password" placeholder="Senha" type="password" onChangeHandle={(e) => handleChangeInput(e, 'password')} />
                    <Input id="con-password" name="con-password" placeholder="Confirmar Senha" type="password" onChangeHandle={(e) => handleChangeInput(e, 'confirmPassword')} />
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
