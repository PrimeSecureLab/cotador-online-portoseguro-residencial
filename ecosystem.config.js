module.exports = {
    apps: [{
        name: 'porto-residecial',
        script: 'index.js',
        env: {
            NODE_ENV: 'production',
            PORT: 5000,
            URL_RAIZ: 'https://residencial.primesecure.com.br',
            PORTO_API_URL: 'https://portoapi.portoseguro.com.br/re/residencial/v1/habitual/orcamentos',
            PORTO_API_TOKEN: 'YzIwMGEwNzYtZTZhZC00MGRhLThkYTktMDg0NmFiODkyNzI1OjI3OGYyMjUzLWJjOGMtNGM3NS05NTQ1LTE3NmRhMjA2M2JjNg=: ',
            AMBIENTE: 'PRODUCAO',
            SANDBOX_AUTH_USERNAME: 'c200a076-e6ad-40da-8da9-0846ab892725',
            SANDBOX_AUTH_PASSWORD: '66b5bf1b-8014-4111-a50f-01c2be1f1bd6',
            HOMOLOGACAO_AUTH_USERNAME: '114fbf1e-be55-4298-9a45-ad18126cc1d2',
            HOMOLOGACAO_AUTH_PASSWORD: '21e41041-c3c8-48bc-b9b9-7d595d7a242a',
            PRODUCAO_AUTH_USERNAME: '9cf33683-fda5-4ca3-8741-88b72e7e29bf',
            PRODUCAO_AUTH_PASSWORD: 'd0cf0969-4b1f-4ae1-82c4-dac1929ba869',
            DB_SECRET_TOKEN: 'a5S2dA5fgJHN5239KHK&j5kf454Ic14756a0a4b80f8434a43b49fa82d80a4n5o',
            DB_HOST: 'localhost',
            DB_USER: 'root',
            DB_PASSWORD: '06053782albb',
            DB_NAME: 'dados-cotacao',
            DB_URL: 'mongodb+srv://prime-secure:senha-teste-123@cluster-teste.n0nu7gu.mongodb.net/PrimeResidencial-Producao?retryWrites=true&w=majority',
            CRYPTO_TOKEN: 'a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a',
            SMTP_USER: 'AKIA42KAFBREDOZW42GP',
            SMTP_PASSWORD: 'BCLRUYp0XhQE60D5xR9KIvorWRPFwt5wifSr84iOTG2t',
            SMTP_ENDPOINT: 'email-smtp.us-east-1.amazonaws.com',
            SMTP_PORTA: 465,
            FORM_SECRET_TOKEN: 'a5S2dA5fgJHN5239KHK&j5kf454Ic14756a0a4b80f8434a43b49fa82d80a4n5o',
        }
    }]
};