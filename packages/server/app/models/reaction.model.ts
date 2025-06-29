import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { Comment } from './comment.model';

@Table({
  tableName: 'reactions',
  timestamps: true
})
export class Reaction extends Model<InferAttributes<Reaction>, InferCreationAttributes<Reaction>> {
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
  declare emoji: string;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare commentId: number;

  @BelongsTo(() => Comment)
  declare comment?: NonAttribute<Comment>;
}
