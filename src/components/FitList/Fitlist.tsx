import { Logo } from '../Logo/Logo'
import styles from './FitList.module.css'

export const Fitlist = (): JSX.Element => {
    return (
        <section className={`${styles['home-page-content']}`}>
            <Logo size='md' hoverEffect logoHeightClass='normal' />
            <p className={`${styles['home-page-content-p']}`}>FitList te ajuda a tornar o seu plano de exercícios mais dinâmicos, mais playlist!</p>
        </section>
    );
}