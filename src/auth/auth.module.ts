import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositary } from './user.repositary';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [
    JwtModule.register({
      secret: 'topsecret51',
      signOptions : {
        expiresIn : 3600,
        
      }
    }),
    TypeOrmModule.forFeature([UserRepositary]),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
