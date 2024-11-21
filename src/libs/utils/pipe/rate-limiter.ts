import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerLimitDetail } from '@nestjs/throttler/dist/throttler.guard.interface';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    const delay = throttlerLimitDetail.ttl / 1000;
    const hours = Math.floor(delay / 3600);
    const minutes = Math.floor((delay % 3600) / 60);
    const seconds = Math.floor(delay % 60);
    // Further customize the error message...
    throw new ThrottlerException(
      `You have made too many requests. Please try again later.`,
    );
  }
}
