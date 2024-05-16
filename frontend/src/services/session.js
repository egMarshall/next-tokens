// Decorator Pattern
import { authService } from "./auth/authService";
import { useRouter } from "next/router";
import React from "react";

// Lógica para SSR
export function withSession(funcao) {
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

// Lógica para static 
export function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    authService.getSession()
      .then((userSession) => {
        setSession(userSession);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  return {
    data: {
      session,
    },
    error,
    loading,
  }
}

// Lógica para static com HOC (High Order Component)
export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const session = useSession();
    const router = useRouter();
  
    if(!session.loading && session.error) {
      router.push('/?error=401')
    }

    const modifiedProps = {
      ...props,
      session: session.data,
    }
    return (
      <Component {...modifiedProps}/>
    )
  }
}