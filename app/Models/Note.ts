import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import NoteType from './NoteType';

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  title: string

  @column()
  message: string

  @column()
  note_type_id: number

  @column()
  user_id: number

  @column()
  files: string[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => NoteType)
  public note_type: BelongsTo<typeof NoteType>
}
