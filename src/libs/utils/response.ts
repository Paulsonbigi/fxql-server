import { Expose } from 'class-transformer';
import { IsArray, IsObject, ValidateIf, ValidateNested } from 'class-validator';
import { ResponseCodeEnum } from './exceptions/response.code';

export class ResponseMetaDTO<
  T = {
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
    pageNumber: number;
    pageSize: number;
  },
> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }

  @Expose()
  totalNumberOfRecords: number;

  @Expose()
  totalNumberOfPages: number;

  @Expose()
  pageNumber: number;

  @Expose()
  pageSize: number;
}

export class ResponseDTO<T> {
  constructor(partial: ResponseDTO<T>) {
    Object.assign(this, partial);
  }

  @Expose()
  code: string;

  @Expose()
  message: string;

  @Expose()
  @ValidateIf(
    (obj) => Array.isArray(obj.field) || typeof obj.field === 'object',
  )
  @IsArray()
  @IsObject()
  @ValidateNested({ each: true })
  data?: T;

  @Expose()
  @IsObject()
  meta?: any;
}

export class Response {
  public static success<T>(
    message: string,
    data?: T,
    meta?: any,
    code?: string,
  ): ResponseDTO<T> {
    return new ResponseDTO<T>({
      code: code || ResponseCodeEnum.SUCCESSFUL_REQUEST,
      message,
      data,
      meta,
    });
  }

  public static pending<T>(
    message: string,
    data?: T,
    meta?: any,
    code?: string,
  ) {
    return new ResponseDTO<T>({
      code: code || 'pending',
      message,
      data,
      meta,
    });
  }

  public static error<T>(message: string, data?: T, code?: string) {
    console.log(message, code, data)
    return new ResponseDTO<T>({
      code: code || 'error',
      message,
      data,
    });
  }

  // static error(message: string, data?: any, code?: string): ResponseDTO<null> {
  //   console.log('&^^^^^', code, data)
  //   return {
  //     code: code || 'error',
  //     message,
  //     data,
  //   };
  // }
}
