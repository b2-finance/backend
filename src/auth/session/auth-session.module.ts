import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from 'src/log/log.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { SessionService } from './service/session.service';
import { Session } from './entity/session.entity';
import { PasswordService } from './service/password.service';
import { Password } from './entity/password.entity';
import { UserService } from '../user/service/user.service';
import { UserMapper } from '../user/mapper/user.mapper';
import { User } from '../user/entity/user.entity';

/**
 * Provides authorization using user session state. Upon logging in, a session id
 * is created in the database. All subsequent requests from this user will be
 * attached to this session id, until they logout or the session expires.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Session, Password, User]), LogModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    SessionService,
    PasswordService,
    UserService,
    UserMapper
  ],
  exports: [AuthService, SessionService, UserService, UserMapper]
})
export class AuthSessionModule {}
