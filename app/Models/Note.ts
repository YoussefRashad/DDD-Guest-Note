import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import User from './User';
import NoteType from './NoteType';
import File from './File';

export default class Note extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public message: string

  @column()
  public note_type_id: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationships
  @belongsTo(() => User, { localKey: 'id', foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @belongsTo(() => NoteType, { localKey: 'id', foreignKey: 'note_type_id' })
  public note_type: BelongsTo<typeof NoteType>

  @hasMany(() => File, { foreignKey: 'note_id' })
  public files: HasMany<typeof File>

  @computed()
  public get pivot() {
    return this.$extras
  }
}
