import {
  Request,
  Response,
  NextFunction,
  IMiddlewareFunction,
} from '@nasts/core';

export const ExampleLoggerMiddleware: IMiddlewareFunction = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('Example Logger:', request.method, '-', request.url);
  next();
};
