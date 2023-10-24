import { Header } from '@/components/UI/Header/Header';
import { SEO } from '@/components/SEO/SEO';
import Image from 'next/image';
import { TrainingSection } from '@/components/TrainingSection/TrainingSection';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { token } = parseCookies(ctx);
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
