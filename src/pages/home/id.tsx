import { Header } from '@/components/UI/Header/Header';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';
import styles from '@/styles/UserHome.module.css';
import { TrainingSection } from '@/components/TrainingSection/TrainingSection';

export default function Home() {
    return (
        <>
            <SEO />
            <Header
                navItemComponents={[
                    <Image src="/images/settings.svg" alt="Botão de configurações" width="30" height="30" key="/images/settings.svg" />
                ]}
            />

            <TrainingSection />
        </>
    );
}