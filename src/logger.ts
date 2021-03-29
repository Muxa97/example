import winston from 'winston'
import { PARAMETER_SERVICE_NAME, PARAMETER_DEFAULT_MODULE_NAME } from './const'

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: {
    service: PARAMETER_SERVICE_NAME,
    module: PARAMETER_DEFAULT_MODULE_NAME,
  },
  transports: [
    new (winston.transports.Console)({
      level: 'info',
    }),
  ],
})
