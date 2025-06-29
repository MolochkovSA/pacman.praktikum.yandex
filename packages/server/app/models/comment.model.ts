import { Column, DataType, Table, HasMany, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { Reply } from './reply.model';
import { Topic } from './topic.model';

@Table({
  tableName: 'comments',
  timestamps: true
})
export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
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
  declare text: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare author: string;

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare topicId: number;

  @BelongsTo(() => Topic)
  declare topic?: NonAttribute<Topic>;

  @HasMany(() => Reply, {
    foreignKey: 'commentId',
    as: 'replies'
  })
  declare replies?: NonAttribute<Reply[]>;
}
