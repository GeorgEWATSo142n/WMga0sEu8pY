// 代码生成时间: 2025-10-12 03:58:31
import { Module } from '@nestjs/common';
import { DataDictionaryController } from './dataDictionary.controller';
import { DataDictionaryService } from './dataDictionary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataDictionaryEntity } from './dataDictionary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataDictionaryEntity])],
  controllers: [DataDictionaryController],
  providers: [DataDictionaryService],
})
export class DataDictionaryModule {}

/*
 * DataDictionaryEntity represents a data dictionary entry in the database.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('data_dictionary')
export class DataDictionaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;
}

/*
 * DataDictionaryService handles business logic for data dictionary operations.
 * It interacts with the database through the TypeORM repository.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataDictionaryEntity } from './dataDictionary.entity';
import { CreateDataDictionaryDto } from './dto/createDataDictionary.dto';
import { UpdateDataDictionaryDto } from './dto/updateDataDictionary.dto';

@Injectable()
export class DataDictionaryService {
  constructor(
    @InjectRepository(DataDictionaryEntity)
    private readonly dataDictionaryRepository: Repository<DataDictionaryEntity>,
  ) {}

  /*
   * Create a new data dictionary entry.
   * @param createDataDictionaryDto the data necessary to create an entry.
   */
  async create(createDataDictionaryDto: CreateDataDictionaryDto): Promise<DataDictionaryEntity> {
    const item = this.dataDictionaryRepository.create(createDataDictionaryDto);
    return this.dataDictionaryRepository.save(item);
  }

  /*
   * Retrieve all data dictionary entries.
   * @returns an array of data dictionary entries.
   */
  async findAll(): Promise<DataDictionaryEntity[]> {
    return this.dataDictionaryRepository.find();
  }

  /*
   * Retrieve a single data dictionary entry by key.
   * @param key the key of the data dictionary entry to retrieve.
   * @returns the data dictionary entry if found, otherwise null.
   */
  async findOne(key: string): Promise<DataDictionaryEntity | undefined> {
    return this.dataDictionaryRepository.findOneBy({ key });
  }

  /*
   * Update an existing data dictionary entry.
   * @param key the key of the data dictionary entry to update.
   * @param updateDataDictionaryDto the data necessary to update the entry.
   * @returns the updated data dictionary entry.
   */
  async update(key: string, updateDataDictionaryDto: UpdateDataDictionaryDto): Promise<DataDictionaryEntity> {
    const item = await this.findOne(key);
    if (!item) {
      throw new NotFoundException(`Data dictionary entry with key ${key} not found`);
    }
    this.dataDictionaryRepository.merge(item, updateDataDictionaryDto);
    return this.dataDictionaryRepository.save(item);
  }

  /*
   * Delete a data dictionary entry by key.
   * @param key the key of the data dictionary entry to delete.
   */
  async remove(key: string): Promise<void> {
    const item = await this.findOne(key);
    if (!item) {
      throw new NotFoundException(`Data dictionary entry with key ${key} not found`);
    }
    await this.dataDictionaryRepository.remove(item);
  }
}

/*
 * DataDictionaryController exposes endpoints for managing data dictionary entries.
 */
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { DataDictionaryService } from './dataDictionary.service';
import { CreateDataDictionaryDto } from './dto/createDataDictionary.dto';
import { UpdateDataDictionaryDto } from './dto/updateDataDictionary.dto';

@Controller('data-dictionary')
export class DataDictionaryController {
  constructor(private readonly dataDictionaryService: DataDictionaryService) {}

  @Post()
  async create(@Body() createDataDictionaryDto: CreateDataDictionaryDto): Promise<any> {
    return this.dataDictionaryService.create(createDataDictionaryDto);
  }

  @Get()
  async findAll(): Promise<DataDictionaryEntity[]> {
    return this.dataDictionaryService.findAll();
  }

  @Get(':key')
  async findOne(@Param('key') key: string): Promise<DataDictionaryEntity> {
    return this.dataDictionaryService.findOne(key);
  }

  @Put(':key')
  async update(@Param('key') key: string, @Body() updateDataDictionaryDto: UpdateDataDictionaryDto): Promise<DataDictionaryEntity> {
    return this.dataDictionaryService.update(key, updateDataDictionaryDto);
  }

  @Delete(':key')
  async remove(@Param('key') key: string): Promise<void> {
    return this.dataDictionaryService.remove(key);
  }
}

/*
 * CreateDataDictionaryDto is the data transfer object for creating a new data dictionary entry.
 */
import { IsString } from 'class-validator';

export class CreateDataDictionaryDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

/*
 * UpdateDataDictionaryDto is the data transfer object for updating an existing data dictionary entry.
 */
export class UpdateDataDictionaryDto {
  @IsString()
  key?: string;

  @IsString()
  value?: string;
}
