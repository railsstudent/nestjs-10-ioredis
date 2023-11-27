import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RedisCacheModuleOptions } from './redis-cache-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<RedisCacheModuleOptions>()
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .build();
