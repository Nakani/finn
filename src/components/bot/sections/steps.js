import { requisitionsService } from '../../../services/requisitions'

export const getSteps = (setState, getState) => {
    const getAtendanceType = (nameVisitor) => {
        let templateMessage = []
        switch (getState().typeAtendance) {
            case 'entrega':
                templateMessage = {
                    name: getState().nameUser,
                    body: 'Oi ' + getState().nameUser + ' sua entrega(' + nameVisitor + ') está o aguardando na recepção!'
                }
                break;
            case 'visitors':
                templateMessage = {
                    name: getState().nameUser,
                    body: 'Oi ' + getState().nameUser + ', ' + nameVisitor + ' o espera na recepção!'
                }
                break;
        }
        return templateMessage
    };

    const stepsInit = [

        {
            id: '0',
            message: 'Oi! eu sou o Finn',
            trigger: '1',
        },

        {
            id: '1',
            message: 'Tudo bem?',
            trigger: '2',
        },

        {
            id: '2',
            message: 'O que posso ajudar?',
            trigger: 'optionInit',
        },

        {
            id: 'optionInit',
            options: [
                { value: 1, label: 'Eu quero conhecer a 4All! 😍', trigger: 'reactionTour' },
                { value: 2, label: 'Eu Tenho horário marcado!', trigger: 'atendimento4All' },
                {
                    value: 3, label: 'Eu tenho uma entrega!', trigger: () => {
                        return 'outros'
                    }
                },
            ],
        },

        {
            id: 'reactionTour',
            message: '🥰',
            trigger: 'initTour',
        },

        {
            id: 'initTour',
            message: 'Mas que legal! então vamos lá, selecione qual área deseja conhecer!',
            trigger: 'optionTour',
        },

        {
            id: 'getName',
            message: 'com quem deseja falar?',
            trigger: () => {
                setState({ inputUser: 'flex' });
                return 'initName';
            },
        },

        {
            id: 'initName',
            user: true,
            validator: (name) => {
                setState({ inputUser: 'none', nameUser: name });
                getAtendanceType()
                return true;
            },
            trigger: 'nameVisitor',
        },

        {
            id: 'nameVisitor',
            message: 'Qual seu nome ou empresa?',
            trigger: () => {
                setState({ inputUser: 'flex' });
                return 'initNameVisitor';
            },
        },

        {
            id: 'initNameVisitor',
            user: true,
            validator: (name) => {
                setState({ inputUser: 'none', nameVisitor: name });
                let message = getAtendanceType(name)
                getNameAttendance(message)
                return true;
            },
            trigger: 'waitAttendance',
        },

        {
            id: 'initOption',
            message: () => {
                return 'Olá {previousValue}! então vamos lá, selecione qual área deseja conhecer!'
            },
            trigger: 'optionTour',
        },


        {
            id: 'optionTour',
            options: [
                { value: 1, label: 'Uhuu', trigger: 'uhuuInit' },
                { value: 2, label: 'PHI', trigger: 'phi' },
                { value: 3, label: 'Ground', trigger: 'ground' },
            ],
        },

        {
            id: 'uhuuInit',
            message: 'Que ótimo! então vamos lá ',
            trigger: 'erroInit',
        },

        {
            id: 'phi',
            message: 'Que ótimo! então vamos lá',
            trigger: 'erroInit',
        },

        {
            id: 'ground',
            message: 'Que ótimo! então vamos lá',
            trigger: 'erroInit',
        },

        {
            id: 'atendimento4All',

            message: () => {
                setState({ typeAtendance: 'visitors' })
                return 'Que ótimo! então vamos lá'
            },
            trigger: 'getName',
        },

        {
            id: 'outros',
            message: '❤',
            trigger: () => {
                setState({ typeAtendance: 'entrega' })
                return 'initDelivery0'
            },
        },

        {
            id: 'initDelivery0',
            message: 'Oba! que bom que chegou!',
            trigger: 'initDelivery',
        },
        {
            id: 'initDelivery',
            message: 'só que antes, preciso saber',
            trigger: 'getName',
        },

        {
            id: 'waitAttendance',
            message: () => {
                return 'Que ótimo então, só peço então que aguarde na recepção!'
            },
            trigger: 'waitAttendance1',
        },

        {
            id: 'waitAttendance1',
            message: 'posso ajudar com mais alguma coisa?',
            trigger: 'optionEnd',
        },

        {
            id: 'optionEnd',
            options: [
                { value: 1, label: 'É só isso, Obrigado!', trigger: 'end' },
                { value: 2, label: 'Sim, preciso de outro favor!', trigger: '2' },
            ],
        },


        {
            id: 'erroInit',
            message: () => {
                console.log('aqui', getState())
                return 'Puxa vida 😐 Estou no aguardo de algumas informações, mas acredito que os devs já estão trabalhando nisso 👨‍💻'
            },
            trigger: 'erroCall',
        },

        {
            id: 'initVideo',
            message: ' enquanto isso,gostaria de assistir algum vídeo?',
            trigger: 'optionVideo',
        },

        {
            id: 'optionVideo',
            options: [
                { value: 1, label: 'É só isso, Obrigado!', trigger: 'playVideo' },
                { value: 1, label: 'É só isso, Obrigado!', trigger: 'end' },
                { value: 2, label: 'Sim, preciso de outro favor!', trigger: '2' },
            ],
        },

        {
            id: 'playVideo',
            message: ' aproveite',
            trigger: 'end',
        },

        {
            id: 'erroCall',
            message: 'mas assim, vou chamar alguém para te acompanhar!',
            trigger: 'optionEnd',
        },
        {
            id: 'end',
            message: 'Até mais! 😘',
            end: true,
        },
    ];
    return stepsInit;
};

async function getNameAttendance(message) {
    const response = await requisitionsService.sendMessage(message)
    return response
}
