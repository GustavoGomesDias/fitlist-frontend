import { useState } from 'react';
import { Header } from '@/components/UI/Header/Header';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';
import { LateralMenu } from '@/components/LateralMenu/LateralMenu';
import styles from '@/styles/Settings.module.css';
import { TrainingPanel, AccountPanel } from '@/components';
import { useRouter } from 'next/router';

export default function Settings() {
    const [settingType, setSettingType] = useState<'training' | 'account'>('training');

    const { back } = useRouter();

    // fl-settings-btn

    return (
        <>
            <SEO />
            <Header
                navItemComponents={[
                    <Image src="/images/back.svg" alt="Voltar para Home" width="25" height="25" key="/images/settings.svg" title='Voltar para Home' onClick={() => back()} />
                ]}
            />


            <section className={styles['fl-settings']}>
                <LateralMenu components={[{
                    content: 'Treinos',
                    type: 'training',
                    setTypeFn: setSettingType,
                }, {
                    content: 'Configuração de Conta',
                    type: 'account',
                    setTypeFn: setSettingType,
                }]} />

                {settingType === 'training' ? <TrainingPanel draggable={true} /> : <AccountPanel />}
               

               
            </section>
        </>
    );
}