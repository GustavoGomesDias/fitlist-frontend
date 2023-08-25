import { Header } from '@/components/UI/Header/Header';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';
import Link from 'next/link';
import { LateralMenu } from '@/components/LateralMenu/LateralMenu';
import styles from '@/styles/Settings.module.css';
import { WeekDayCard } from '@/components/WeekDayCard/WeekDayCard';

export default function Settings() {
    const trainings = [{
        weekday: 'Segunda',
        training: 'Peito',
    }, {
        weekday: 'Segunda',
        training: 'Peito',
    }, {
        weekday: 'Segunda',
        training: 'Peito',
    }, {
        weekday: 'Segunda',
        training: 'Peito',
    }, {
        weekday: 'Segunda',
        training: 'Peito',
    }, {
        weekday: 'Segunda',
        training: 'Peito',
    }, {
        weekday: 'Segunda',
        training: 'Peito',
    }];

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
                <section className={styles['fl-setting-section']}>
                    <h3 className={styles['fl-settings-header']}>Treinos</h3>

                    <div className={styles['fl-setting-weekdyas']}>
                        {trainings.map((item) => <WeekDayCard weekday={item['weekday']} training={item['training']} />)}
                    </div>
                </section>
            </section>
        </>
    );
}