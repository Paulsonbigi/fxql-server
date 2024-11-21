import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionHandler } from './exception.handler';
import { ConfigService } from '@nestjs/config';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly config: ConfigService) {}

  logger = new Logger();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const err = ExceptionHandler(exception, this.config);
    const { status } = err;
    if (
      this.config.get('NODE_ENV') === 'production' &&
      this.config.get('LOGGER') &&
      status &&
      ![
        HttpStatus.BAD_REQUEST,
        HttpStatus.UNAUTHORIZED,
        HttpStatus.NOT_FOUND,
      ].includes(status)
    ) {
      // Add to logging tool. eg sentry
    }

    this.logger.error(JSON.stringify(err));
    if (status) {
      response.status(status).json({
        success: false,
        message: err?.message || 'Error processing request',
        data: err?.data,
        ...err,
      });
    } else {
      response.json({
        success: false,
        message: err?.message || 'Error processing request',
        data: err?.data,
        ...err,
      });
    }
  }
}
