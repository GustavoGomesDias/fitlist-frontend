import { Header } from '@/components/UI/Header/Header';
import { Logo } from '@/components/Logo/Logo';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';

export default function Home() {
    return (
        <>
            <SEO />
            <Header
                navItemComponents={[
                    <Image src="/images/settings.svg" alt="Botão de configurações" width="30" height="30" />
                ]}
            />
        </>
    );
}