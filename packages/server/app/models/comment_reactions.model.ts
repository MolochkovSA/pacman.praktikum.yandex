import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { Comment } from './comment.model';
import { Reaction } from './reaction.model';

@Table({ tableName: 'comment_reactions', timestamps: true })
export class CommentReaction extends Model<InferAttributes<CommentReaction>, InferCreationAttributes<CommentReaction>> {
  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare commentId: number;

  @ForeignKey(() => Reaction)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare reactionId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare author: string;

  @BelongsTo(() => Reaction)
  declare reaction?: NonAttribute<Reaction>;

  @BelongsTo(() => Comment)
  declare comment?: NonAttribute<Comment>;
}
