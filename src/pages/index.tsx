import { useState } from 'react';
import styles from '@/styles/Home.module.css'
import { Input, Button, LinkButton, Form } from '@/components/UI';
import { Logo } from '@/components';
import { SEO } from '@/components';
import { Fitlist } from '@/components';

export default function Login() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    return (
        <>
            <SEO />

            <div className={`${styles['home-content']}`}>
                <section className={`${styles['transition-logo']}`}>
                    <Logo size='md' hoverEffect={false} logoHeightClass='normal' />
                </section>

                <Fitlist />

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
                    </form>) : (<form action="#" className={`${styles['register-form']}`}>
                        <Input id="email" name="email" placeholder="E-mail" type="text" onChangeHandle={() => { }} />
                        <Input id="name" name="nam" placeholder="Nome" type="text" onChangeHandle={() => { }} />
                        <Input id="password" name="password" placeholder="Senha" type="password" onChangeHandle={() => { }} />
                        <Input id="con-password" name="con-password" placeholder="Confirmar Senha" type="password" onChangeHandle={() => { }} />
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
