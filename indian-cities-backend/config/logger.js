const winston = require('winston')
require('winston-daily-rotate-file')

const transport = new (winston.transports.DailyRotateFile)({
  filename: 'indianCities-%DATE%.log',
  dirname: `${process.env.LOGS}`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  colorize: true,
  json: false,
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(log => {
      return `${log.timestamp} [${log.level}] : ${JSON.stringify(log.message)}`
    })
  )
})

const logger = winston.createLogger({
  transports: [
    transport
  ]
})

module.exports = logger
