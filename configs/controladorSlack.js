const dotenv = require('dotenv');
const { WebClient } = require('@slack/web-api');

dotenv.config();

const slackClient = new WebClient(process.env.SLACK_ACCESS_TOKEN);

async function mensagemSlack(canal, mensagem){ 
    canal = canal || 'prime-secure-residencial';
    mensagem = mensagem || '';
    try {
        const response = await slackClient.chat.postMessage({
            channel: canal,
            text: mensagem
        });
            console.log('Mensagem enviada com sucesso:', response.ts);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
    }
}

function getSlackClient() { return slackClient; }

module.exports = { mensagemSlack, getSlackClient };
