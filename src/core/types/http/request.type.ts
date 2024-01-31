import { Context } from '@/core/application/interfaces/context.interface';
import { Request as ExpressRequest } from 'express';

export type Request = ExpressRequest & Context;
