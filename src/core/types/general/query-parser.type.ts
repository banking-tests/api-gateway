import { Json } from '@/core/types/general/json.type';
import { QueryParsedOptions } from './query-parsed-options.type';

export type QueryParser = {
  filter: Json;
  options: QueryParsedOptions;
};
