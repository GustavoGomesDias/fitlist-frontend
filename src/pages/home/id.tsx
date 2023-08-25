import { Logo } from '@/components/Logo/Logo';
import { SEO } from '@/components/SEO/SEO';

export default function Home() {
    return (
        <>
            <SEO />
            <header>
                <Logo size='xl' hoverEffect />
            </header>
        </>
    );
}