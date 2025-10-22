// 代码生成时间: 2025-10-23 00:43:56
import { Module } from '@nestjs/common';
import { NetworkTrafficMonitorService } from './network_traffic_monitor.service';
import { NetworkTrafficMonitorController } from './network_traffic_monitor.controller';

// 网络流量监控模块，负责协调网络流量监控相关的服务和控制器
@Module({
  providers: [NetworkTrafficMonitorService],
  controllers: [NetworkTrafficMonitorController],
})
export class NetworkTrafficMonitorModule {}

// network_traffic_monitor.service.ts
import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

// 网络流量监控服务，负责执行网络流量监控的逻辑
@Injectable()
export class NetworkTrafficMonitorService {
  // 模拟网络流量数据
  private networkTrafficData = {
    received: 0,
    sent: 0,
  };

  // 增加接收到的数据量
  incrementReceivedData(size: number): void {
    this.networkTrafficData.received += size;
  }

  // 增加发送的数据量
  incrementSentData(size: number): void {
    this.networkTrafficData.sent += size;
  }

  // 获取当前网络流量数据
  getNetworkTrafficData(): Observable<{ received: number; sent: number }> {
    return of(this.networkTrafficData).pipe(
      map((data) => ({ ...data })),
    );
  }
}

// network_traffic_monitor.controller.ts
import { Controller, Get } from '@nestjs/common';
import { NetworkTrafficMonitorService } from './network_traffic_monitor.service';
import { Observable } from 'rxjs';

// 网络流量监控控制器，负责处理网络流量监控相关的HTTP请求
@Controller('network-traffic')
export class NetworkTrafficMonitorController {
  constructor(private readonly networkTrafficMonitorService: NetworkTrafficMonitorService) {}

  // 获取当前网络流量数据
  @Get()
  getNetworkTrafficData(): Observable<{ received: number; sent: number }> {
    return this.networkTrafficMonitorService.getNetworkTrafficData();
  }
}
