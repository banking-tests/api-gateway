import { Context } from '@/core/interfaces/context.interface';

export interface Executable {
  execute(context: Context, ...params: unknown[]): Promise<unknown>;
}
