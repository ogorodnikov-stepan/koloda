/* eslint-disable @typescript-eslint/naming-convention */
import { Table } from 'dexie';
import { camelize } from 'humps';
import { int } from 'features/app/misc/misc';

export interface ManyParams {
  sort?: string;
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
}

export async function many(table: Table, params: ManyParams) {
  const { sort, filters, limit, offset } = params;
  const desc = sort?.charAt(0) === '-';

  const sorted = sort ? await table.orderBy(camelize(sort?.substring(1))) : table;
  const reversed = desc ? await sorted.reverse() : sorted;
  const filtered = filters ? await reversed.filter((x) => filter(x, filters)) : reversed;
  const paginated = limit ? await filtered.offset(int(offset)).limit(limit) : filtered;
  const data = await paginated.toArray();

  const has_more = !!limit && data.length > limit;
  if (has_more) data.pop();
  const meta = {
    pagination: {
      has_more,
      nextOffset: has_more ? (limit + offset!) : undefined,
    },
  };

  return { data, meta };
}

function filter(item: any, filters: any) {
  return Object.keys(filters).reduce((acc: boolean, x: string) => (
    acc
      ? Array.isArray(filters[x])
        ? filters[x].includes(item[x])
        : filters[x] === item[x]
      : false
  ), true);
}
