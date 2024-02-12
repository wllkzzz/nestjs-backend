import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: "User creation"})
    @ApiResponse({status: 200, type: User})
    @Post() 
    create(@Body() userDTO: CreateUserDTO) {
        return this.usersService.createUser(userDTO);
    }

    @ApiOperation({summary: "Get all users"})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getUsers()
    }
}
