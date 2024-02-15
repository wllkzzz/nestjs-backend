import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
require("dotenv").config();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      privateKey: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class AuthModule {}
