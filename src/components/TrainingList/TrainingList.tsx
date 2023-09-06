import styles from './TrainingList.module.css';

export const TrainigList = (): JSX.Element => {
    return (
        <section className={`${styles['fd-training-section']}`}>

            <div className={`${styles['exercism-day-list']}`}>

                <div className={`${styles['exercism-plan']}`}>
                    <div className={`${styles['exercism']}`}>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                        <span className={`${styles['fd-exer']}`}>Flexão declinada / 3x8 - 30s off</span>
                    </div>
                </div>
            </div>
        </section>
    );
}