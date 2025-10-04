// 代码生成时间: 2025-10-05 03:54:25
import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
# 优化算法效率
import { LeaderboardController } from './leaderboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardEntity } from './leaderboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaderboardEntity])],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
# FIXME: 处理边界情况
export class LeaderboardModule {}
# 增强安全性

/* LeaderboardService is responsible for business logic related to leaderboards.
 * It provides methods for creating, updating, and retrieving leaderboard data. */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaderboardEntity } from './leaderboard.entity';
import { LeaderboardDto } from './leaderboard.dto';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(LeaderboardEntity)
    private readonly leaderboardRepository: Repository<LeaderboardEntity>,
  ) {}
# NOTE: 重要实现细节

  /* Creates a new leaderboard entry. */
  async create(leaderboardDto: LeaderboardDto): Promise<LeaderboardEntity> {
    const newLeaderboard = this.leaderboardRepository.create(leaderboardDto);
    return this.leaderboardRepository.save(newLeaderboard);
# FIXME: 处理边界情况
  }

  /* Retrieves all leaderboard entries. */
  async findAll(): Promise<LeaderboardEntity[]> {
    return this.leaderboardRepository.find();
  }
# 增强安全性

  /* Retrieves a single leaderboard entry by id. */
# 添加错误处理
  async findById(id: number): Promise<LeaderboardEntity> {
    return this.leaderboardRepository.findOneBy({ id });
  }

  /* Updates a leaderboard entry. */
  async update(id: number, leaderboardDto: LeaderboardDto): Promise<LeaderboardEntity> {
    await this.leaderboardRepository.update(id, leaderboardDto);
    return this.leaderboardRepository.findOneBy({ id });
  }

  /* Deletes a leaderboard entry by id. */
  async delete(id: number): Promise<void> {
    await this.leaderboardRepository.delete(id);
  }
# TODO: 优化性能
}

/* LeaderboardController handles HTTP requests related to leaderboards. */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardDto } from './leaderboard.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  /* Creates a new leaderboard entry. */
  @Post()
  async create(@Body() leaderboardDto: LeaderboardDto) {
    return this.leaderboardService.create(leaderboardDto);
  }

  /* Retrieves all leaderboard entries. */
  @Get()
  async findAll() {
    return this.leaderboardService.findAll();
  }

  /* Retrieves a single leaderboard entry by id. */
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.leaderboardService.findById(id);
  }

  /* Updates a leaderboard entry. */
  @Put(':id')
  async update(@Param('id') id: number, @Body() leaderboardDto: LeaderboardDto) {
    return this.leaderboardService.update(id, leaderboardDto);
  }

  /* Deletes a leaderboard entry by id. */
  @Delete(':id')
  async delete(@Param('id') id: number) {
# FIXME: 处理边界情况
    return this.leaderboardService.delete(id);
  }
}

/* LeaderboardEntity represents the structure of a leaderboard entry in the database. */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LeaderboardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  score: number;
}

/* LeaderboardDto is used for transferring leaderboard data between client and server. */
export class LeaderboardDto {
  username: string;
  score: number;
}
