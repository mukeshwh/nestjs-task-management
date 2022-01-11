import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositary } from './user.repositary';

@Module({
  imports : [
    TypeOrmModule.forFeature([UserRepositary]),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
