import Joi from '@hapi/joi'
import { createValidator } from 'express-joi-validation'

const validator = createValidator()

const schemaStorePoints = Joi.object({
  image: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  whatsapp: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  city: Joi.string().required(),
  uf: Joi.string().required(),
  items: Joi.array().required(),
})
export const validateBodyToCreatePoints = validator.body(schemaStorePoints)

const schemaGetPointById = Joi.object({
  id: Joi.number().required(),
})
export const validateParamsGetPointById = validator.params(schemaGetPointById)
