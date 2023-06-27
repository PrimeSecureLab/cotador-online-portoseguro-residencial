const winston = require('winston');
const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');

dotenv.config();

const logFolder = path.join(__dirname, 'logs');
if (!fs.existsSync(logFolder)){ fs.mkdirSync(logFolder); }

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.printf((info)=> { return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`; })
    ),
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({ filename: path.join(logFolder, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logFolder, 'combined.log') })
    ]
});

module.exports = logger;
