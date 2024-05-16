// Decorator Pattern
import { authService } from "./auth/authService";

export default function withSession(funcao) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedContext = {
        ...ctx,
        req: {
          ...ctx.req,
          session
        }
      }
    return funcao(modifiedContext);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: '/?error=401'
        }
      }
    }
  }
}