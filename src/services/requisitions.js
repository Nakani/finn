
import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

async function sendMessage(message) {

    const body = {
        'collaboratorName': message.name.toLowerCase(),
        'message': message.body
    }
    try {
        const response = await axios.post('https://server-node-finn.herokuapp.com/notify-whats',
            body,
            config
        )
        return response.data
    } catch (error) {
        console.log('ops deu erro', error)
        console.error(error);
    }
}


export const requisitionsService = {
    sendMessage,
};

