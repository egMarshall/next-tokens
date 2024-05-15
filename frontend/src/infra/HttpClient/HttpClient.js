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
}