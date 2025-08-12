import redis from '@adonisjs/redis/services/main'

export default class CacheService {
  static async getOrSet<T>(key: string, ttl: number, fetchFn: () => Promise<T>): Promise<T> {
    const cached = await redis.get(key)
    if (cached) {
      return JSON.parse(cached)
    }

    const freshData = await fetchFn()
    await redis.setex(key, ttl, JSON.stringify(freshData))
    return freshData
  }

  static async invalidate(key: string) {
    await redis.del(key)
  }
}