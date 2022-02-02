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
    const users = (await Note.query().select("user_id").distinct()).map(
      (user) => user.user_id
    );
    users.map(async (user_id) => {
      const notes = await Note.query()
        .from("notes")
        .select(Database.rawQuery(`note_type_id, note_types.name, count(*)`))
        .where(
          Database.rawQuery(
            `notes.created_at BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()`
          )
        )
        .andWhere("user_id", user_id)
        .join("note_types", "note_types.id", "notes.note_type_id")
        .groupBy("note_type_id", "note_types.name");

      notes.map((note) => {
        console.log(
          `user ${user_id} got a new ${note.$extras.count} ${note.$extras.name}.`
        );
      });
    });
  }
}
