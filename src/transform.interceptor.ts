import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessageKey } from './response.decorator';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  meta: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<any>> {
    const responseMessage = this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ?? '';
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: responseMessage,
        data,
        meta: {}, // if this is supposed to be the actual return then replace {} with data.result
      })),
    );
  }
}
