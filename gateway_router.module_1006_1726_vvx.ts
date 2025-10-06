// 代码生成时间: 2025-10-06 17:26:31
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RouterModule, Routes } from '@nestjs/router';

// 定义API网关路由器模块
@Module({
  imports: [RouterModule.forRoutes(routes)],
  providers: [
    //{ provide: APP_GUARD, useClass: JwtAuthGuard } // If you need a global guard
  ],
})
export class GatewayRouterModule {
  // 定义路由
  static routes: Routes = [
    // 此处可以添加更多的路由
    { path: 'auth', module: AuthModule }, // 假设有一个AuthModule处理认证
    { path: 'user', module: UserModule }, // 假设有一个UserModule处理用户相关API
    // ... 其他模块路由
  ];
}

// 你可以在这里添加更多的模块或者服务来支持API网关的功能