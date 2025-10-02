// 代码生成时间: 2025-10-02 23:46:55
import { Module } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionController } from './user-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermissionEntity } from './user-permission.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPermissionEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserPermissionController],
  providers: [UserPermissionService, JwtStrategy],
})
export class UserPermissionManagementModule {}

/*
 * UserPermissionService: 提供用户权限管理业务逻辑的服务类
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPermissionEntity } from './user-permission.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(UserPermissionEntity) private readonly userPermissionRepository: Repository<UserPermissionEntity>,
    private jwtService: JwtService,
  ) {}

  // 获取所有用户权限
  async findAll(): Promise<UserPermissionEntity[]> {
    return this.userPermissionRepository.find();
  }

  // 根据ID获取用户权限
  async findOne(id: number): Promise<UserPermissionEntity> {
    return this.userPermissionRepository.findOneBy({ id });
  }

  // 创建用户权限
  async create(userPermission: UserPermissionEntity): Promise<UserPermissionEntity> {
    return this.userPermissionRepository.save(userPermission);
  }

  // 更新用户权限
  async update(id: number, userPermission: UserPermissionEntity): Promise<UserPermissionEntity> {
    await this.userPermissionRepository.update({ id }, userPermission);
    return this.userPermissionRepository.findOne({ id });
  }

  // 删除用户权限
  async delete(id: number): Promise<void> {
    await this.userPermissionRepository.delete(id);
  }
}

/*
 * UserPermissionController: 提供用户权限管理的HTTP接口
 */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionEntity } from './user-permission.entity';

@Controller('user-permissions')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @Get()
  async findAll(): Promise<UserPermissionEntity[]> {
    return this.userPermissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserPermissionEntity> {
    return this.userPermissionService.findOne(+id);
  }

  @Post()
  async create(@Body() userPermission: UserPermissionEntity): Promise<UserPermissionEntity> {
    return this.userPermissionService.create(userPermission);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userPermission: UserPermissionEntity): Promise<UserPermissionEntity> {
    return this.userPermissionService.update(+id, userPermission);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userPermissionService.delete(+id);
  }
}

/*
 * UserPermissionEntity: 用户权限的实体类
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserPermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}

/*
 * jwt.strategy.ts: JWT认证策略
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}

/*
 * constants.ts: JWT常量
 */
export const jwtConstants = {
  secret: 'your_jwt_secret',
};