import { Request, Response, NextFunction } from 'express'
import { ZodType, ZodError } from 'zod'

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      // Trocamos .errors por .issues para funcionar perfeitamente com o ZodType
      const errors = (result.error as ZodError).issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))

      res.status(422).json({ errors })
      return
    }

    req.body = result.data
    next()
  }
}