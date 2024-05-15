import { HttpClient } from '../../infra/httpClient/HttpClient';

export const authService = {
  async login({ username, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: 'POST',
      body: { username, password }
    })
    .then(async (response) => {
      if(!response.ok) throw new Error('Usuário ou senha inválidos!')
      const body = response.body;
      console.log(body);
    })
  }  
};