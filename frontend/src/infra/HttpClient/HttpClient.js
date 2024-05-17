import nookies from 'nookies';

// Arquitatura Hexagonal
// Ports & Adapters
export async function HttpClient(fetchUrl, fetchOptions) {

  const options = {
    ...fetchOptions,
    headers: {
      'Content-type': 'application/json',
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  }

  return fetch(fetchUrl, options)
    .then(async (response) => {
      return {
        ok: response.ok,
        status: response.status,
        body: await response.json(),
      }
    })
    .then(async (response) => {
      if (fetchOptions.refresh) return response;
      if (response.status !== 401) return response;

      const isServer = Boolean(fetchOptions?.ctx);
      const currentRefreshToken = fetchOptions?.ctx?.req?.cookies['REFRESH_TOKEN'];

      // Tentar atualizar os tokens
      try { 
        const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
          method: isServer ? 'PUT' : 'GET',
          body: isServer && { refresh_token: currentRefreshToken }
        });

        const newAcessToken = refreshResponse.body.data.access_token;
        const newRefreshToken = refreshResponse.body.data.refresh_token;

        if (isServer) {
          nookies.set(fetchOptions.ctx, 'REFRESH_TOKEN', newRefreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
          })
        }

        // Salvar os novos tokens
        tokenService.save(newAcessToken);

        //Tentar rodar o request anterior

        const retryResponse = await HttpClient(fetchUrl, {
          ...options,
          refresh: false,
          headers: {
            'Authorization': `Bearer ${newAcessToken.body.data.access_token}`
          }
        })
        return retryResponse;
      } catch (error) {
        console.log(error)
        return response;
      }
    });
}