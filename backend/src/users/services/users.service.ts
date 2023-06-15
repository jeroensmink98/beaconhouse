import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto/users-dtos';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.userEmail = createUserDto.userEmail;
        user.userPassword = createUserDto.userPassword;
        return await this.userRepository.save(user);
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
