import { Transaction } from '@/modules/transactions/domain/interfaces/transaction.interface';

export type TransactionPayload = Omit<Transaction, 'uuid' | 'observations' | 'subcategory'> &
  Partial<Pick<Transaction, 'observations' | 'subcategory'>>;
