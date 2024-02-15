import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bccrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) {}

    async login(userDTO: CreateUserDTO) {
        const user = await this.validateUser(userDTO)
        return this.generateToken(user)
    }

   
    async registration(userDTO: CreateUserDTO) {
        const candidate = await this.userService.getUserByEmail(userDTO.email);

        if(candidate){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bccrypt.hash(userDTO.password, 5);

        const user = await this.userService.createUser({...userDTO, password: hashPassword})

        return this.generateToken(user)
    }


    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDTO: CreateUserDTO) {
        const candidate = await this.userService.getUserByEmail(userDTO.email);
        const passwordCompare = await bccrypt.compare(userDTO.password, candidate.password);

        if(candidate && passwordCompare) {
            return candidate
        }

        throw new UnauthorizedException({"message": "Invalid email or password"})
    }
}
