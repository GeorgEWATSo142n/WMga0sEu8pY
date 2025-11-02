// 代码生成时间: 2025-11-02 19:28:40
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'; // Import the AuthService which contains the authentication logic
import { JwtModule } from '@nestjs/jwt'; // JWT module for token generation
import { PassportModule } from '@nestjs/passport'; // Passport module for authentication strategies
import { JwtStrategy } from './jwt.strategy'; // JWT strategy for authentication
import { LocalStrategy } from './local.strategy'; // Local strategy for username/password authentication
import { AuthController } from './auth.controller'; // Controller for handling authentication requests
import { User } from '../user/user.entity'; // Import the User entity
import { DatabaseModule } from '../database/database.module'; // Database module for database interactions

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}

/* AuthService - Service for handling multi-factor authentication */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../user/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.validateUser(username, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  // Additional methods for multi-factor authentication can be added here
}

/* JwtStrategy - Strategy for JWT authentication */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: authService.getRequestToken,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(request: Request): Promise<any> {
    const user = await this.authService.validateUser(request.user.username, request.user.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

/* AuthController - Controller for handling authentication requests */
import { Controller, Post, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // Additional routes for multi-factor authentication can be added here
}

/* LocalAuthGuard - Guard for local authentication */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

/* JwtAuthGuard - Guard for JWT authentication */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

/* jwt-payload.interface.ts - Interface for JWT payload */
export interface JwtPayload {
  username: string;
  sub: number;
}

/* local-auth.guard.ts - Guard for local authentication */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

/* jwt-auth.guard.ts - Guard for JWT authentication */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

/* local.strategy.ts - Strategy for local authentication */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
