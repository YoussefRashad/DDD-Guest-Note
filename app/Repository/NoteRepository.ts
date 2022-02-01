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
}
