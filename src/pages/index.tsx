import styles from '@/styles/Home.module.css'
import { Input, Button, LinkButton } from '@/components/UI/index'
import { Logo } from '@/components/Logo/Logo'
import { SEO } from '@/components/SEO/SEO'

export default function Login() {
    return (
        <>
            <SEO />

            <div className={`${styles['home-content']}`}>
                <section className={`${styles['transition-logo']}`}>
                    <Logo size='md' hoverEffect={false} logoHeightClass='normal'/>
                </section>

                <section className={`${styles['home-page-content']}`}>
                    <Logo size='md' hoverEffect logoHeightClass='normal' />
                    <p className={`${styles['home-page-content-p']}`}>FitList te ajuda a tornar o seu plano de exercícios mais dinâmicos, mais playlist!</p>
                </section>

                <section className={`${styles['home-page-login-form']}`}>
                    <form action="#" className={`${styles['login-form']}`}>
                        <Input id='email' name='email' placeholder='E-mail' type='text' onChangeHandle={(e) => {}}/>
                        <Input id='password' name='password' placeholder='Senha' type='password' onChangeHandle={(e) => {}}/>
                        <Button
                            classType='success'
                            id='login-form-submit'
                            text='Entrar'
                            type='submit'
                        />
                        <LinkButton
                            classType='normal'
                            id='register-btn'
                            href='/'
                            text='Cadastre-se'
                        />
                    </form>
                </section>
            </div>
        </>

    )
}
