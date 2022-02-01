import Database from '@ioc:Adonis/Lucid/Database';
import Note from 'App/Models/Note';

export default class NoteRepository {
  public async createNote({title, message, note_type_id, user_id}: {title: string, message: string, note_type_id: number , user_id: number}) {
    return Note.create({
      title,
      message,
      note_type_id,
      user_id,
    });
  }

  public async fetchNotes({ user_id, per_page, page, filter }: { user_id: number, per_page: number, page: number, filter: any }) {
    const notesQuery = Note.query()
      .select(['*', 'notes.id', 'note_types.id as note_type_id', 'note_types.name', 'note_types.disabled'])
      .join('note_types', 'note_types.id', 'note_type_id')
      .where('user_id', user_id)
      .andWhere('note_types.disabled', false)
      .andWhere(
        Database.rawQuery(`notes.created_at > current_date - interval '30' day`)
      )
      .if(filter, query => {
        if(filter?.note_type_id) query.where('note_type_id', filter.note_type_id)
      })
    const notes = await notesQuery.preload('note_type').preload('files').paginate(page, per_page)
    return notes
  }
}
