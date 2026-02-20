import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { TabIfoCmtRepository } from './repository/tabifocmt.repository';
import { TabIfoGarRepository } from './repository/tabifogar.repository';
import { TabIfoLeafRepository } from './repository/tabifoleaf.repository';
import { UserInfoRepository } from './repository/userinfo.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'Secret5678'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRES_IN', 3600),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
              UserRepository,UserService,TabIfoCmtRepository,TabIfoGarRepository,TabIfoLeafRepository,UserInfoRepository],
  exports: [UserRepository,TabIfoCmtRepository,TabIfoGarRepository,TabIfoLeafRepository,UserInfoRepository],
})
export class AuthModule {}
