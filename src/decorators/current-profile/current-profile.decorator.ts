import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentProfileId = createParamDecorator(
  (data: unknown, context: ExecutionContext): number | null => {
    const request = context.switchToHttp().getRequest();
    return request.user?.profileId || null; // Retorna o profileId do payload
  },
);
