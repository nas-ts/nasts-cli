import { App } from '@nasts/core';
import { ExampleController } from './controllers/example.controller';
import { ExampleLoggerMiddleware } from './middleware/example-logger.middleware';

const app = new App({
  middleware: [ExampleLoggerMiddleware],
  controllers: [ExampleController],
  port: 5000,
});

app.start();
