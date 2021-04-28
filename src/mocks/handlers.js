import moment from "moment"
import { rest } from "msw"

export const handlers = [
  rest.get("/api/session", (req, res, ctx) => {
    return res(
      ctx.json({
        authenticated: req.cookies['auth-token'] !== undefined
      })
    )
  }),

  rest.post("/api/session", (req, res, ctx) => {
    const token = Math.random().toString(16).substring(2, 8)

    return res(
      ctx.cookie('auth-token', token),
      ctx.json({
        authenticated: true
      })
    )
  }),

  rest.delete("/api/session", (req, res, ctx) => {
    const expires = new Date(moment().subtract(1, "second").toDate())

    return res(
      ctx.cookie('auth-token', undefined, { expires }),
      ctx.json({
        authenticated: false
      })
    )
  })
]