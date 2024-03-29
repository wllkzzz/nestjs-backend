import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RolesCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: "roles"})
export class Role extends Model<Role, RolesCreationAttrs> {
    @ApiProperty({example: "1", description: "Unique number"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "ADMIN", description: "Unique role"})
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: "Administrator", description: "Administrator"})
    @Column({type: DataTypes.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    user: User[]
}