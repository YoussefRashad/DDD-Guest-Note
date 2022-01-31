import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  title: string

  @column()
  message: string

  @column()
  note_type_id: string

  @column()
  files: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
