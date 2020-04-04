import { Model, Column, Table, HasMany, DataType } from "sequelize-typescript";
import { User } from "./User";

@Table({
  timestamps: true,
  comment: 'Role table is using to store all roles of users',
  freezeTableName: true,
  tableName: 'Roles',
})
export class Role extends Model<Role> {
  @Column(DataType.TEXT)
  name!: string;

  @Column(DataType.BOOLEAN)
  status!: boolean;

  @Column(DataType.BOOLEAN)
  isDeleted!: boolean;

  @HasMany(() => User)
  users?: User[];
}
