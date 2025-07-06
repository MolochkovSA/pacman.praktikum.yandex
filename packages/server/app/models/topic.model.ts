import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { Column, DataType, Table, HasMany, Model } from 'sequelize-typescript';
import { Comment } from './comment.model';

@Table({
  tableName: 'topics',
  timestamps: true
})
export class Topic extends Model<InferAttributes<Topic>, InferCreationAttributes<Topic>> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: CreationOptional<number>;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare themeDescription: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare text: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare author: string;

  @HasMany(() => Comment, {
    foreignKey: 'topicId',
    as: 'comments'
  })
  declare comments?: NonAttribute<Comment[]>;
}
