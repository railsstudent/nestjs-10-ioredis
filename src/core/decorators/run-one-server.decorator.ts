import { v4 as uuidV4 } from 'uuid';

export function RunOneServer() {
  return function (_target: any, _propertyName: string, descriptor: any): void {
    const originalFunction = descriptor.value;
    descriptor.value = async function (...args: any[]): Promise<any> {
      const lockKey = `${this.constructor.name}_${originalFunction.name}`;
      const oldValue = await this.redisManager.getClient().getset(lockKey, uuidV4());
      const pollInterval = 10000;
      setTimeout(() => {
        if (this.redisManager.getClient().status === 'ready') {
          this.redisManager.getClient().del(lockKey);
        }
      }, pollInterval);

      if (!oldValue) {
        return originalFunction.apply(this, args);
      }
    };
  };
}
