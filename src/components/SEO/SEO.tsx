import Head from 'next/head'

export const SEO = () => {
    return (
        <Head>
            <title>FitList</title>
            <meta name="description" content="Seu aplicativo para criar o melhor plano de exercícios!" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}