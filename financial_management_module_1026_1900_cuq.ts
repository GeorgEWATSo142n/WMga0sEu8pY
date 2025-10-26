// 代码生成时间: 2025-10-26 19:00:50
import { Module } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';
import { FinancialManagementController } from './financial-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancialRecord, FinancialRecordSchema } from './schemas/financial-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FinancialRecord.name, schema: FinancialRecordSchema },
    ]),
  ],
  controllers: [FinancialManagementController],
  providers: [FinancialManagementService],
})
export class FinancialManagementModule {}

/* Financial Management Service */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FinancialRecord, FinancialRecordDocument } from './schemas/financial-record.schema';

@Injectable()
export class FinancialManagementService {
  constructor(@InjectModel(FinancialRecord.name) private financialRecordModel: Model<FinancialRecordDocument>) {}

  async createRecord(record: Partial<FinancialRecord>): Promise<FinancialRecord> {
    try {
      const newRecord = new this.financialRecordModel(record);
      return await newRecord.save();
    } catch (error) {
      throw new Error('Failed to create financial record');
    }
  }

  async getRecords(): Promise<FinancialRecord[]> {
    try {
      return await this.financialRecordModel.find().exec();
    } catch (error) {
      throw new Error('Failed to retrieve financial records');
    }
  }

  async updateRecord(id: string, changes: Partial<FinancialRecord>): Promise<FinancialRecord> {
    try {
      return await this.financialRecordModel.findByIdAndUpdate(id, changes, { new: true }).exec();
    } catch (error) {
      throw new Error('Failed to update financial record');
    }
  }

  async deleteRecord(id: string): Promise<FinancialRecord> {
    try {
      return await this.financialRecordModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Failed to delete financial record');
    }
  }
}

/* Financial Management Controller */
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';
import { FinancialRecord } from './schemas/financial-record.schema';

@Controller('financial-management')
export class FinancialManagementController {
  constructor(private readonly financialManagementService: FinancialManagementService) {}

  @Post()
  async createFinancialRecord(@Body() record: FinancialRecord): Promise<FinancialRecord> {
    return await this.financialManagementService.createRecord(record);
  }

  @Get()
  async getFinancialRecords(): Promise<FinancialRecord[]> {
    return await this.financialManagementService.getRecords();
  }

  @Put(':id')
  async updateFinancialRecord(@Param('id') id: string, @Body() changes: Partial<FinancialRecord>): Promise<FinancialRecord> {
    return await this.financialManagementService.updateRecord(id, changes);
  }

  @Delete(':id')
  async deleteFinancialRecord(@Param('id') id: string): Promise<FinancialRecord> {
    return await this.financialManagementService.deleteRecord(id);
  }
}

/* Financial Record Schema */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FinancialRecordDocument = FinancialRecord & Document;

@Schema()
export class FinancialRecord {
  @Prop()
  amount: number;

  @Prop()
  description: string;

  @Prop()
  date: Date;
}

export const FinancialRecordSchema = SchemaFactory.createForClass(FinancialRecord);