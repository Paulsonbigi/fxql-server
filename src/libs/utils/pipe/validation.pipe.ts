import {
  ConflictException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { Response } from '../response';
import { ResponseCodeEnum } from '../exceptions/response.code';

@Injectable()
export class ObjectValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  async transform(data: any): Promise<any> {
    try {
      if (!data || !data.FXQL) {
        throw new ConflictException('Input data not specified');
      }

      // Replace `\\n` with actual newlines
      const fxqlString = data.FXQL.replace(/\\n/g, '\n');

      // Split FXQL statements by double newlines
      const fxqlStatements = fxqlString.trim().split(/\n\s*\n/);

      const parsedStatements = fxqlStatements.map((statement: any) => {
        const fxqlRegex = /^(\w+)-(\w+)\s*{([\s\S]*)}$/;
        const match = statement.match(fxqlRegex);

        if (!match) {
          throw Response.error(
            'FXQL format is invalid',
            '',
            ResponseCodeEnum.CONDITION_FAILED_EXCEPTION,
          );
        }

        const [, sourceCurrency, destinationCurrency, body] = match;
        const lines = body.trim().split(/\n/); // Split the body by newlines
        const result: Record<string, any> = {};

        lines.forEach((line: string) => {
          const [key, value] = line.trim().split(/\s+/); // Split key and value
          if (key && value) {
            result[key] = isNaN(Number(value)) ? value : Number(value); // Convert numeric values
          }
        });

        return {
          SourceCurrency: sourceCurrency,
          DestinationCurrency: destinationCurrency,
          CapAmount: result.CAP,
          BUY: result.BUY,
          SELL: result.SELL,
        };
      });
      if (parsedStatements.length > 1000) {
        throw Response.error(
          'Maximum currency pair per request exceeded.',
          '',
          ResponseCodeEnum.CONDITION_FAILED_EXCEPTION,
        );
      }

      // Step 2: Validate parsed data with Joi schema
      const validatedData = await Promise.all(
        parsedStatements.map((parsedData: any) =>
          this.schema.unknown(false).validateAsync(parsedData, {
            stripUnknown: true,
          }),
        ),
      );

      Logger.debug('payload validation success....');
      return validatedData; // Return the validated array of FXQL objects
    } catch (e) {
      Logger.debug('payload validation error....');
      console.log(e?.message);
      const message =
        e?.details?.[0]?.context?.customMessage ||
        e?.message ||
        'Payload validation failed';
      throw Response.error(
        message,
        '',
        ResponseCodeEnum.CONDITION_FAILED_EXCEPTION,
      );
    }
  }
}
