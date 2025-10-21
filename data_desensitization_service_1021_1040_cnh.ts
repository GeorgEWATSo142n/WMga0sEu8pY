// 代码生成时间: 2025-10-21 10:40:28
import { Injectable } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { validate, IsEmail, IsPhoneNumber } from 'class-validator';
import { plainToClass } from 'class-transformer';

// Define a class to hold the data that needs to be desensitized
class DesensitizableData {
  @IsEmail()
  @Transform(({ value }) => value ? value.replace(/.(.+)@/, 'x@') : value)
  email?: string;

  @IsPhoneNumber('International')
  @Transform(({ value }) => value ? value.replace(/(\d{3})\d+(\d{3})/, '$1xxx$2') : value)
  phoneNumber?: string;
}

@Injectable()
export class DataDesensitizationService {
  // Function to desensitize data
  async desensitizeData(data: any): Promise<any> {
    try {
      // Use class-transformer to transform the input data
      const desensitizedData = await plainToClass(DesensitizableData, data);
      // Validate the transformed data
      const errors = await validate(desensitizedData);
      // If there are validation errors, throw an exception
      if (errors.length > 0) {
        throw new Error('Validation failed');
      }
      return desensitizedData;
    } catch (error) {
      // Handle any errors that occur during desensitization
      throw new Error('Failed to desensitize data: ' + error.message);
    }
  }
}
