import React, { Component } from 'react';
import Bot from 'react-native-chatbot';
import { getSteps } from './sections/steps'


export class ChatBot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputUser: 'none',
            typeAtendance: ''

        }
    }

    handleStep = (data) => {
        this.setState(data, () => console.log(data));
    }

    getStepType = () => this.state



    render() {
        const { inputUser } = this.state
        return (
            <Bot
                steps={getSteps(this.handleStep, this.getStepType)}
                speechSynthesis={{ enable: true, lang: 'en' }}
                hideBotAvatar={true}
                hideUserAvatar={true}
                botFontColor={'#fff'}
                userFontColor={'#fff'}
                botBubbleColor={'transparent'}
                userBubbleColor={'transparent'}
                bubbleStyle={{
                    borderWidth: 3,
                    borderColor: '#2D9634'
                }}
                userBubbleStyle={{
                    borderWidth: 3,
                    borderColor: '#2D9634'
                }}
                optionBubbleColor={'#2D9634'}
                style={{ backgroundColor: '#f7f7f7 ', marginTop: 2 }}
                contentStyle={{ backgroundColor: 'transparent' }}
                placeholder={'Digite sua mensagem!'}
                submitButtonContent={'Enviar'}
                footerStyle={{
                    backgroundColor: '#fff',
                    margin: 5,
                    padding: 1,
                    borderRadius: 7,
                    elevation: 2,
                    display: inputUser
                }}
                submitButtonStyle={{
                    backgroundColor: '#2D9634',
                    borderRadius: 4,
                    width: 63,
                    margin: 2
                }}

            />
        );
    }
}
