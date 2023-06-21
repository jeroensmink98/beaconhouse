import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Workspace } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto/users-dtos';
import { WorkspacesService } from 'src/workspaces/services/workspaces.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly workSpaceService: WorkspacesService,
    ) { }


    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = new User();
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.userEmail = createUserDto.userEmail;
            user.userPassword = createUserDto.userPassword;

            const workspace = await this.workSpaceService.getWorkspaceById(createUserDto.workspaceId);
            user.workspace = workspace;

            return await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') { // '23505' is a PostgreSQL error code for unique_violation
                throw new ConflictException('A user with this email already exists');
            }
            throw error;
        }
    }

    async getUserByWorkspaceId(workspaceId: string): Promise<User[]> {
        return await this.userRepository.findBy({ workspace: { workspaceId } });
    }

    async getUserByEmail(userEmail: string): Promise<User> {
        return await this.userRepository.findOneBy({ userEmail });
    }

    async getUserById(userId: string): Promise<User> {
        return await this.userRepository.findOneBy({ userId });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(id);
        user.firstName = updateUserDto.firstName || user.firstName;
        user.lastName = updateUserDto.lastName || user.lastName;
        user.userEmail = updateUserDto.userEmail || user.userEmail;
        user.userPassword = updateUserDto.userPassword || user.userPassword; // Consider hashing the password before storing it
        return await this.userRepository.save(user);
    }
}
