import { useState } from 'react';
import { Header } from '@/components/UI/Header/Header';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';
import { LateralMenu } from '@/components/LateralMenu/LateralMenu';
import styles from '@/styles/Settings.module.css';
import { TrainingPanel, AccountPanel } from '@/components';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import api from '@/services/api';
import { TrainingPlan } from '@/data/models/TrainingPlan';

export interface SettingsProps {
    trainingPlans: TrainingPlan[]
}

export default function Settings({ trainingPlans }: SettingsProps) {
    const [settingType, setSettingType] = useState<'training' | 'account'>('training');

    const { back } = useRouter();

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

                {settingType === 'training' ? <TrainingPanel draggable={false} trainingPlans={trainingPlans} /> : <AccountPanel />}
            </section>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const { token, user } = parseCookies(ctx);
        const { id } = ctx.params as { id: string };

        const response = await api.get(`/trainingPlan/all/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response.status);

        if (response.status !== 200) {
            return {
                props: {
                    trainingPlans: [],
                },
            };
        }

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        return {
            props: {
                trainingPlans: response.data.body.content,
            },
        };
    } catch(e) {
        return {
            props: {
                trainingPlans: [],
            }
        }
    }
    
};