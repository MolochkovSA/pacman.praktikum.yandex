import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'themes',
  timestamps: true
})
export class Theme extends Model<InferAttributes<Theme>, InferCreationAttributes<Theme>> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare name: string;
}
