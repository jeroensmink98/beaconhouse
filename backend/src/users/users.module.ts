import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => WorkspacesModule),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }

