import NoteRepository from '../Repository/NoteRepository';

export default class NoteService {
  noteRepository = new NoteRepository()

  public async sendNote({ user_ids, title, message, note_type_id, media_files }: { user_ids: number[], title: string, message: string, note_type_id: number, media_files}) {
    user_ids.map(async (user_id) => {
      const note = await this.noteRepository.createNote({ title, message, note_type_id, user_id })
      await note.related("files").createMany([
        ...media_files?.map((media_file) => {
          return { media_file: media_file.clientName };
        }),
      ]);
    });
  }
}
