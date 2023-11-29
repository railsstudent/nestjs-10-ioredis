import Redis from 'ioredis';

export async function getCacheValue<T>(redisCache: Redis, key: string): Promise<T> {
  const val = await redisCache.get(key);
  return val === undefined || val === null ? undefined : (JSON.parse(val) as T);
}

export async function setCacheValue(redisCache: Redis, key: string, value: unknown, ttl = 0): Promise<void> {
  const stringifiedValue = JSON.stringify(value) || '"undefined"';
  if (ttl !== undefined && ttl !== 0) {
    await redisCache.set(key, stringifiedValue, 'EX', ttl);
  } else {
    await redisCache.set(key, stringifiedValue);
  }
}

export function keys(redisCache: Redis, pattern = '*'): Promise<string[]> {
  return redisCache.keys(pattern);
}

export async function deleteCacheValue(redisCache: Redis, key: string): Promise<void> {
  await redisCache.del(key);
}

export async function deleteCacheKeysByPattern(redisCache: Redis, pattern = '*'): Promise<void> {
  const matchedKeys = await keys(redisCache, pattern);
  await Promise.allSettled(matchedKeys.map((k) => redisCache.del(k)));
}
