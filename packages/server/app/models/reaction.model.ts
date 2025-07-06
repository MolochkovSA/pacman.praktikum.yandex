import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { CommentReaction } from './comment_reactions.model';

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

  @HasMany(() => CommentReaction)
  declare commentReactions?: NonAttribute<CommentReaction[]>;
}
