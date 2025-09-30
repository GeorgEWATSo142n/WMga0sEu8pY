// 代码生成时间: 2025-09-30 21:49:50
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaAssetService } from './mediaAsset.service';
import { MediaAssetController } from './mediaAsset.controller';
import { MediaAssetRepository } from './mediaAsset.repository';

// 定义模块，提供媒体资产的管理功能
@Module({
  imports: [TypeOrmModule.forFeature([MediaAssetRepository])],
  controllers: [MediaAssetController],
  providers: [MediaAssetService],
})
export class MediaAssetModule {}

/*
 * Media Asset Controller
 */
import { Controller, Get, Post, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MediaAssetService } from './mediaAsset.service';
import { MediaAssetDto } from './mediaAsset.dto';

@Controller('media-assets')
export class MediaAssetController {
  constructor(private readonly mediaAssetService: MediaAssetService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMediaAsset(@Body() mediaAssetDto: MediaAssetDto): Promise<any> {
    return this.mediaAssetService.createMediaAsset(mediaAssetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMediaAssetById(@Param('id') id: string): Promise<any> {
    const mediaAsset = await this.mediaAssetService.getMediaAssetById(id);
    if (!mediaAsset) throw new NotFoundException('Media Asset not found');
    return mediaAsset;
  }
}

/*
 * Media Asset Service
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaAssetRepository } from './mediaAsset.repository';
import { MediaAssetDto } from './mediaAsset.dto';

@Injectable()
export class MediaAssetService {
  constructor(
    @InjectRepository(MediaAssetRepository)
    private mediaAssetRepository: Repository<MediaAssetRepository>,
  ) {}

  async createMediaAsset(mediaAssetDto: MediaAssetDto): Promise<any> {
    try {
      const mediaAsset = this.mediaAssetRepository.create(mediaAssetDto);
      return await this.mediaAssetRepository.save(mediaAsset);
    } catch (error) {
      throw new Error('Failed to create media asset');
    }
  }

  async getMediaAssetById(id: string): Promise<any> {
    try {
      return await this.mediaAssetRepository.findOne(id);
    } catch (error) {
      throw new Error('Failed to find media asset');
    }
  }
}

/*
 * Media Asset Repository
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('media_assets')
export class MediaAsset {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;
  
  @Column()
  description: string;
  
  @Column()
  fileUrl: string;
}

/*
 * Media Asset DTO
 */
export class MediaAssetDto {
  title: string;
  description: string;
  fileUrl: string;
}
