import { Form } from 'model-one'
import { UserI } from '../interfaces'
import Joi from 'joi'

const schema = Joi.object({
  id: Joi.string(),
  discord_user_id: Joi.string(),
  discord_access_token: Joi.string(),
  discord_refresh_token: Joi.string(),
  discord_expires_at: Joi.string(),
})

export class UserForm extends Form {
  constructor(data: UserI) {
    super(schema, data)
  }
}