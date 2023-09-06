import { Header } from '@/components/UI/Header/Header';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';
import Link from 'next/link';
import { LateralMenu } from '@/components/LateralMenu/LateralMenu';
import styles from '@/styles/Settings.module.css';
import { WeekDayCard } from '@/components/WeekDayCard/WeekDayCard';
import { TrainingPanel } from '@/components';

export default function Settings() {
    const trainings = [{
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }, {
        weekday: 'Segunda-feira',
        training: 'Peito',
    }];

    // fl-settings-btn

    return (
        <>
            <SEO />
            <Header
                navItemComponents={[
                    <Link href='/'>
                        <Image src="/images/back.svg" alt="Voltar para Home" width="25" height="25" key="/images/settings.svg" title='Voltar para Home'/>
                    </Link>
                ]}
            />


            <section className={styles['fl-settings']}>
                <LateralMenu components={[<span>Treinos</span>, <span>Configuração de Conta</span>]} />
               <TrainingPanel />
            </section>
        </>
    );
}