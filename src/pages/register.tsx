import { Fitlist, SEO } from '@/components';
import { Form, Header, Input } from '@/components/UI';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css'

const Register = (): JSX.Element => {
    const { back } = useRouter()

    return (
        <>
            <SEO />
            <Header
                navItemComponents={[
                    <Image src="/images/back.svg" alt="Voltar para Home" width="25" height="25" key="/images/settings.svg" title='Voltar para Home' onClick={() => back()} />
                ]}
            />


            <section className={styles['register-content']}>
                <div className={styles['register-content-ft']}>
                    <Fitlist />
                </div>
                
            </section>

        </>
    );
}

export default Register;