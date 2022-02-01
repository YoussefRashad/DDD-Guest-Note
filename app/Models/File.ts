import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Note from './Note';

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public media_file: string

  @column()
  public note_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationships
  @belongsTo(() => Note)
  public note: BelongsTo<typeof Note>
}
