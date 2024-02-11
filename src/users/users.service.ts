import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDTO) {
        const { email, password } = dto;
        const user = await this.userRepository.create({ email, password });
        return user;
    }

    async getUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
