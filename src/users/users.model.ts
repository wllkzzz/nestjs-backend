import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: "1", description: "Unique number"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "example@gmail.com", description: "Email adress"})
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: "example123QW", description: "Password"})
    @Column({type: DataTypes.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: "true", description: "Banned or not?"})
    @Column({type: DataTypes.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: "Insulting", description: "Reason"})
    @Column({type: DataTypes.STRING, allowNull: true})
    banReason: string;
}