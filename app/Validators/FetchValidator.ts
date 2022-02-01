import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


/**
 * *all* endpoint body => page, perPage, query, filters, sort by, from, to
 */
export default class FetchValidator {
  constructor (protected ctx?: HttpContextContract) {
  }

  public schema = schema.create({
    user_id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
    page: schema.number(),
    per_page: schema.number(),
    filter: schema.object.optional().members({
      note_type_id: schema.number()
    }),
  })

  public messages = {}
}
