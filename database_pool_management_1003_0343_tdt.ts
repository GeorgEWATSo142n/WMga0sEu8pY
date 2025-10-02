// 代码生成时间: 2025-10-03 03:43:17
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm/dist/interfaces';

// DatabasePoolService 用于管理数据库连接池
export class DatabasePoolService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    // 配置数据库连接池属性
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        'dist/**/*.entity{.ts,.js}'
      ],
      synchronize: true,
      logging: false,
      // 连接池相关设置
      max: 10, // 最大连接数
      min: 2, // 最小连接数
      idleTimeout: 30000, // 超过30秒的空闲连接将被关闭
      acquireTimeout: 60000, // 60秒内获取连接失败则抛出错误
    };
  }
}

// DatabaseModule 模块用于配置和提供数据库连接池
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabasePoolService,
    }),
  ],
  exports: [
    TypeOrmModule,
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {
  // 该模块提供了数据库连接池的管理，确保连接池的配置
  // 遵循最佳实践，易于维护和扩展
}
