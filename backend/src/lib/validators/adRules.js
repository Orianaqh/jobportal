import { body } from 'express-validator'
import validate from '../../middleware/validate.js'

export const post = [
  body('title').isString().notEmpty(),
  body('category').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('location').isString().not().isNumeric().notEmpty(),
  body('wage').isNumeric(),
  body('contactVia').isString().notEmpty(),
  validate,
]
