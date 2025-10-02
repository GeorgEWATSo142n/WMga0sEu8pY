// 代码生成时间: 2025-10-02 21:00:25
import { Module } from '@nestjs/common';
import { DeviceFirmwareService } from './device-firmware.service';
import { DeviceFirmwareController } from './device-firmware.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceFirmwareEntity } from './entities/device-firmware.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceFirmwareEntity])],
  controllers: [DeviceFirmwareController],
  providers: [DeviceFirmwareService],
})
export class DeviceFirmwareUpdateModule {}

/*
 * device-firmware.service.ts
 *
 * This service contains the business logic for updating device firmware.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceFirmwareEntity } from './entities/device-firmware.entity';

@Injectable()
export class DeviceFirmwareService {
  constructor(
    @InjectRepository(DeviceFirmwareEntity)
    private deviceFirmwareRepository: Repository<DeviceFirmwareEntity>,
  ) {}

  async updateFirmware(id: string, firmware: string): Promise<DeviceFirmwareEntity> {
    try {
      const deviceFirmware = await this.deviceFirmwareRepository.findOne(id);
      if (!deviceFirmware) {
        throw new Error('Device firmware not found');
      }
      deviceFirmware.firmware = firmware;
      return await this.deviceFirmwareRepository.save(deviceFirmware);
    } catch (error) {
      // Handle error appropriately
      throw new Error('Failed to update device firmware: ' + error.message);
    }
  }
}

/*
 * device-firmware.controller.ts
 *
 * This controller handles HTTP requests for device firmware updates.
 */
import { Controller, Post, Body, Param } from '@nestjs/common';
import { DeviceFirmwareService } from './device-firmware.service';

@Controller('device-firmware')
export class DeviceFirmwareController {
  constructor(private readonly deviceFirmwareService: DeviceFirmwareService) {}

  @Post(':id/update')
  async updateFirmware(
    @Param('id') id: string,
    @Body('firmware') firmware: string,
  ): Promise<{ message: string }> {
    try {
      const updatedFirmware = await this.deviceFirmwareService.updateFirmware(id, firmware);
      return { message: 'Device firmware updated successfully' };
    } catch (error) {
      // Return an appropriate error response
      return { message: 'Error updating device firmware: ' + error.message };
    }
  }
}

/*
 * entities/device-firmware.entity.ts
 *
 * This entity represents the device firmware in the database.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DeviceFirmwareEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firmware: string;
}
