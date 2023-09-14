import { Header } from '@/components/UI/Header/Header';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';
import { TrainingSection } from '@/components/TrainingSection/TrainingSection';
import { useRouter } from 'next/router';

export default function Home() {
    const { push } = useRouter();


    return (
        <>
            <SEO />
            <Header
                navItemComponents={[
                    <Image src="/images/settings.svg" alt="Botão de configurações" width="30" height="30" key="/images/settings.svg"onClick={() => push('/settings/id')}  />
                ]}
            />

            <TrainingSection draggable={false} />
        </>
    );
}