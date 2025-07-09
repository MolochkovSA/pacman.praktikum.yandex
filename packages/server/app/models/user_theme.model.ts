import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { Theme } from './theme.model';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'user_themes', timestamps: true })
export class UserTheme extends Model<InferAttributes<UserTheme>, InferCreationAttributes<UserTheme>> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare externalUserId: string;

  @ForeignKey(() => Theme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare themeId: number;

  @BelongsTo(() => Theme)
  declare theme?: Theme;
}
