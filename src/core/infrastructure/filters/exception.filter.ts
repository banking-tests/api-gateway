import { ConnectionRefusedException } from '@/core/application/exceptions/connection-refused.exception';
import { Request } from '@/core/types/http/request.type';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const debug = this.configService.get<boolean>('environment.debug');
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse ? exception.getResponse() : exception;
    const timestamp = new Date().toISOString();
    const path = request.url;
    const data = exceptionResponse?.data;
    const baseData = {
      requestId: request.requestId,
      timestamp,
      path,
      data,
    };

    if (debug) {
      Logger.error(null, exception.message, request.requestId);
    }

    if (exception?.response?.data) {
      return response
        .status(exception.response.data.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .json(exception.response.data);
    }

    if (exception instanceof HttpException) {
      return response.status(status).json({
        ...baseData,
        statusCode: status,
        message: exceptionResponse.message,
      });
    }

    if (
      exception.code === 'ECONNREFUSED' ||
      (exception.message && exception.message.includes('ECONNREFUSED')) ||
      exception.constructor.name === ConnectionRefusedException.name
    ) {
      const serviceUnavailable = HttpStatus.SERVICE_UNAVAILABLE;
      return response.status(serviceUnavailable).json({
        ...baseData,
        statusCode: serviceUnavailable,
        message: getReasonPhrase(serviceUnavailable),
      });
    }

    return response.status(status).json({
      ...baseData,
      statusCode: status,
      message: getReasonPhrase(status),
    });
  }
}
