import { Context } from '@/core/application/interfaces/context.interface';

export interface Executable {
  execute(context: Context, ...params: unknown[]): Promise<unknown>;
}
