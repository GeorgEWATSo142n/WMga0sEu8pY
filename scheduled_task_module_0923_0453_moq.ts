// 代码生成时间: 2025-09-23 04:53:18
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}

// TasksModule.ts
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule],
  providers: [TasksService],
})
export class TasksModule {}

// TasksService.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    console.log('Running scheduled task...');
    // Implement task logic here
    try {
      // Task logic
    } catch (error) {
      console.error('Error executing scheduled task:', error);
    }
  }
}

// app.controller.ts
import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Welcome to the scheduled task app!';
  }
}

// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {} 
