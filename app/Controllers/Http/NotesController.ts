import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Http from "App/Utils/Http";
import SendNoteValidator from "App/Validators/SendNoteValidator";
import NotesService from "App/Services/NoteService";
import FetchValidator from "App/Validators/FetchValidator";
import DeleteNotesValidator from "App/Validators/DeleteNotesValidator";

export default class NotesController {
  noteService = new NotesService();

  public async sendNote({ request, response }: HttpContextContract) {
    const requestBody = await request.validate(SendNoteValidator);
    await this.noteService.sendNote({ ...requestBody });
    return Http.respond(response, "send note");
  }

  public async fetchNotes({ request, response }: HttpContextContract) {
    const { user_id, per_page, page, filter } = await request.validate(
      FetchValidator
    );
    const notes = await this.noteService.fetchNotes({
      user_id,
      per_page,
      page,
      filter,
    });
    return Http.respond(
      response,
      "fetch notes",
      notes.toJSON().data,
      notes.toJSON().meta
    );
  }

  public async deleteNote({ request, response }: HttpContextContract) {
    const { note_ids } = await request.validate(DeleteNotesValidator)
    const notes = await this.noteService.deleteNote(note_ids)
    return Http.respond(response, 'soft delete', notes)
  }
}
