// 代码生成时间: 2025-10-26 02:07:19
import { Module } from '@nestjs/common';
import { MarketingActivityService } from './marketing-activity.service';
import { MarketingActivityController } from './marketing-activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketingActivity } from './entities/marketing-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketingActivity])],
  controllers: [MarketingActivityController],
  providers: [MarketingActivityService],
})
export class MarketingActivityManagementModule {}

/*
 * Marketing Activity Controller
 * Handles HTTP requests related to marketing activities.
 */
import { Controller, Get, Post, Put, Delete, Body, HttpStatus, Res, NotFoundException } from '@nestjs/common';
import { MarketingActivityService } from './marketing-activity.service';
import { MarketingActivity } from './entities/marketing-activity.entity';

@Controller('marketing-activities')
export class MarketingActivityController {
  constructor(private readonly marketingActivityService: MarketingActivityService) {}

  @Post()
  async create(@Res() res, @Body() createMarketingActivityDto: MarketingActivity) {
    const activity = await this.marketingActivityService.create(createMarketingActivityDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Marketing activity created successfully',
      activity,
    });
  }

  @Get()
  async findAll(@Res() res) {
    const activities = await this.marketingActivityService.findAll();
    return res.status(HttpStatus.OK).json(activities);
  }

  @Put(':id')
  async update(@Res() res, @Body() updateMarketingActivityDto: MarketingActivity, @Param('id') id: string) {
    const updatedActivity = await this.marketingActivityService.update(+id, updateMarketingActivityDto);
    if (!updatedActivity) throw new NotFoundException('Activity not found');
    return res.status(HttpStatus.OK).json({
      message: 'Marketing activity updated successfully',
      activity: updatedActivity,
    });
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    const activity = await this.marketingActivityService.remove(+id);
    if (!activity) throw new NotFoundException('Activity not found');
    return res.status(HttpStatus.OK).json({
      message: 'Marketing activity deleted successfully',
      activity,
    });
  }
}

/*
 * Marketing Activity Service
 * Provides business logic for managing marketing activities.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { MarketingActivity } from './entities/marketing-activity.entity';

@Injectable()
export class MarketingActivityService {
  constructor(
    @InjectRepository(MarketingActivity)
    private marketingActivityRepository: Repository<MarketingActivity>,
  ) {}

  async create(createMarketingActivityDto: MarketingActivity): Promise<MarketingActivity> {
    return this.marketingActivityRepository.save(createMarketingActivityDto);
  }

  async findAll(): Promise<MarketingActivity[]> {
    return this.marketingActivityRepository.find();
  }

  async update(id: number, updateMarketingActivityDto: MarketingActivity): Promise<MarketingActivity> {
    const result = await this.marketingActivityRepository.update(id, updateMarketingActivityDto);
    if (result.affected === 0) throw new NotFoundException('Activity not found');
    return this.marketingActivityRepository.findOne(id);
  }

  async remove(id: number): Promise<MarketingActivity> {
    const result = await this.marketingActivityRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Activity not found');
    return result;
  }
}

/*
 * Marketing Activity Entity
 * Represents a marketing activity in the database.
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MarketingActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  // Additional columns can be added as needed.
}
