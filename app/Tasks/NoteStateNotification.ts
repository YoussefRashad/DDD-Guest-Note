import { BaseTask } from "adonis5-scheduler/build";
import Database from "@ioc:Adonis/Lucid/Database";
import Note from "../Models/Note";

export default class NoteStateNotification extends BaseTask {
  public static get schedule() {
    return "0 0 * * * *";
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false;
  }

  public async handle() {
    const notes = await Note.query()
      .from("notes")
      .where(
        Database.rawQuery(
          `created_at BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()`
        )
    ).preload('note_type')

    const users = [... new Set(notes.map((note) => note.user_id))]
    console.log({users});
  }
}
