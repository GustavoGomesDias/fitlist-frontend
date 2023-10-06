export const makeid = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const trainingFieldTranslate = {
    name: 'Nome',
    description: 'Descrição',
};

export const exercismTranslate = {
    name: 'Nome',
    description: 'Descrição',
    sequence: 'Sequência do exercício',
    serie: 'Série',
    timeOff: 'Tempo de descanso',
    weekDayPlanId: 'Id do dia da semana',
    repetition: 'Repetições',
    time: 'Tempo',
}

export const createUserTranslate = {
    name: 'Nome',
    email: 'E-mail',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha'
}