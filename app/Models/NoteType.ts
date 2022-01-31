import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Note from './Note';

export default class NoteType extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  name: string

  @column()
  disabled: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Note, { foreignKey: 'note_type_id' })
  public notes: HasMany<typeof Note>
}
