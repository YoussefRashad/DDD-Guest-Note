import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import NoteType from './NoteType';

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public message: string

  @column()
  public file_id: string

  @column()
  public note_type_id: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => NoteType)
  public note_type: BelongsTo<typeof NoteType>

  @hasMany(() => Note, { foreignKey: 'note_id' })
  public files: HasMany<typeof Note>
}
