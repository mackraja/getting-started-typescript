import { Model, Column, Table, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Role } from "./Role";

@Table({
  timestamps: true,
  comment: 'User table is using to store all users details',
  freezeTableName: true,
  tableName: 'Users',
})
export class User extends Model<User> {
  @ForeignKey(() => Role)
  @Column(DataType.NUMBER)
  roleId!: number;

  @Column(DataType.TEXT)
  firstName!: string;

  @Column(DataType.TEXT)
  lastName!: string;

  @Column(DataType.TEXT)
  userName!: string;

  @Column(DataType.TEXT)
  password!: string;

  @Column({type: DataType.TEXT, unique: true})
  email!: string;

  @Column(DataType.TEXT)
  phoneNumber!: string;

  @Column(DataType.BOOLEAN)
  status!: boolean;

  @Column(DataType.BOOLEAN)
  isDeleted!: boolean;

  @BelongsTo(() => Role)
  role!: Role;
}
