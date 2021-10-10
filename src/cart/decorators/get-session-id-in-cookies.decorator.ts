import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetSessionId = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.cookies.sessionId;
  },
);
