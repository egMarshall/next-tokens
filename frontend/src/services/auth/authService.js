import { HttpClient } from '../../infra/httpClient/HttpClient';
import { tokenService } from './tokenService';

export const authService = {
  async login({ username, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: 'POST',
      body: { username, password }
    })
    .then(async (response) => {
      if(!response.ok) throw new Error('Usuário ou senha inválidos!')
      const body = response.body;

      tokenService.save(body.data.access_token);

      return body;
    })
    .then(async ({ data }) => {
      const { refresh_token } = data;

      const response = await HttpClient('/api/refresh', {
        method: 'POST',
        body: { refresh_token }
      });
    })
  },
  
  async getSession(ctx) {
    const token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      ctx,
      refresh: true,
    })
    .then(async (response) => {
      if (!response.ok) throw new Error('Não foi possível obter a sessão do usuário!')
      return response.body.data;
    })
  },


};
