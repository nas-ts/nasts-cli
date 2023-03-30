import { Controller, Get, IRouterMethodArguments, Post } from '@nasts/core';

@Controller('/example')
export class ExampleController {
  @Get('/')
  helloWorld(): { hello: string } {
    return {
      hello: 'world',
    };
  }

  @Get('/:id')
  paramsExample({ params }: IRouterMethodArguments): { id: string } {
    return {
      id: params.id,
    };
  }

  @Post('/')
  postExample({ body }: IRouterMethodArguments): any {
    return body;
  }
}
