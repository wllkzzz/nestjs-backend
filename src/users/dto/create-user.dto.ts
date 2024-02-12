import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({example: "example@gmail.com", description: "Email adress"})
    readonly email: string;
    
    @ApiProperty({example: "example123QW", description: "Password"})
    readonly password: string;
}