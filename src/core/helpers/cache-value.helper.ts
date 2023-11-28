import Redis from 'ioredis';

export async function getCacheValue<T>(redisCache: Redis, key: string) {
  const val = await redisCache.get(key);
  return val === undefined || val === null ? undefined : (JSON.parse(val) as T);
}

export const stringifyCacheValue = (value: unknown) => JSON.stringify(value) || '"undefined"';
