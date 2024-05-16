import nookies from 'nookies';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'

export const tokenService = {
  save(accessToken, ctx = null) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, accessToken)
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken)
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  },

  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || '';
    // return globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY) 
    // return globalThis?.sessionStorage?.getItem(ACCESS_TOKEN_KEY)
  },

  delete(ctx = null) {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY)
    nookies.destroy(ctx, ACCESS_TOKEN_KEY, {
      path: '/',
    })
  }
}