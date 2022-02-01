import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Http from "App/Utils/Http";
import SendNoteValidator from "App/Validators/SendNoteValidator";
import NotesService from "App/Services/NoteService";

export default class NotesController {
  noteService = new NotesService()

  public async sendNote({ request, response }: HttpContextContract) {
    const requestBody = await request.validate(SendNoteValidator)
    await this.noteService.sendNote({...requestBody})
    return Http.respond(response, "send note");
  }
}
