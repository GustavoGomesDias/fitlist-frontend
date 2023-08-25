import { Header } from '@/components/UI/Header/Header';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';
import { TrainingSection } from '@/components/TrainingSection/TrainingSection';
import Link from 'next/link';
import { LateralMenu } from '@/components/LateralMenu/LateralMenu';

export default function Home() {
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

            <LateralMenu texts={['Treinos', 'Conta']} />
        </>
    );
}