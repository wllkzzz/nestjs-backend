import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) {}   

    async createUser(dto: CreateUserDTO) {
        const { email, password } = dto;
        const user = await this.userRepository.create({ email, password });
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set("roles", [role.id])
        return user;
    }

    async getUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }
}
