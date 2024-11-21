import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { config } from 'process';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const allowedOrigins = configService.get('ALLOWED_ORIGINS')?.split(',') || [];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        frameAncestors: ["'none'"],
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('FXQL Service API')
    .setDescription(
      'API collection for FXQL - Foreign Exchange Query Language (FXQL) Statement Parser using NestJS and TypeScript. This parser will serve as part of a central federation system for Bureau De Change (BDC) operations, allowing them to submit and standardize their exchange rate information',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);
  const port = configService.get('server.port');

  await app.listen(port, '0.0.0.0');
  logger.debug(`FXQL BACKEND SERVICE LISTENING ON - ${await app.getUrl()}  🚀`);
}
bootstrap();
