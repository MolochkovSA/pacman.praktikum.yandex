import { BelongsTo, Column, DataType, ForeignKey, Table, Model, HasMany } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { Comment } from './comment.model';

@Table({
  tableName: 'replies',
  timestamps: true
})
export class Reply extends Model<InferAttributes<Reply>, InferCreationAttributes<Reply>> {
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

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  declare commentId: number | null;

  @BelongsTo(() => Comment)
  declare comment?: NonAttribute<Comment>;

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  declare parentId: number | null;

  @BelongsTo(() => Reply, {
    foreignKey: 'parentId',
    targetKey: 'id',
    as: 'parent'
  })
  declare parent?: NonAttribute<Reply>;

  @HasMany(() => Reply, {
    foreignKey: 'parentId',
    as: 'children'
  })
  declare children?: NonAttribute<Reply[]>;
}
